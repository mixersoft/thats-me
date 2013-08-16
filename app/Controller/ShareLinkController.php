<?php
/**
 * Static content controller.
 *
 * This file will render views from views/pages/
 *
 * PHP 5
 *
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright 2005-2012, Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright 2005-2012, Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @package       app.Controller
 * @since         CakePHP(tm) v 0.2.9
 * @license       MIT License (http://www.opensource.org/licenses/mit-license.php)
 */

App::uses('AppController', 'Controller');
App::uses('AuthComponent', 'Controller/Component');

/**
 * ShareLink controller
 *
 * backdoor auth bypass for controlled access to pages
 *
 * @package       app.Controller
 * @link http://book.cakephp.org/2.0/en/controllers/pages-controller.html
 */
class ShareLinkController extends AppController {

	public $name = 'ShareLink';
	public $layout = 'default';
	public $components = array('Auth', 'RequestHandler', 'Cookie');
	
	public function beforeFilter(){
		parent::beforeFilter();
		$this->Auth->allow('*');
		$this->Auth->deny('view_login');
		$this->Cookie->time = '1 month';
		// $this->Cookie->domain = '.snaphappi.com';	}
		
	public function form_create($targetId, $ownerId, $securityHash) {
		if (empty($_GET['link'])) {
			throw new NotFoundException();
		}
		$link = $_GET['link'];

		$securityCheck = $this->Auth->password($targetId . $ownerId . $link);
		if ($securityCheck != $securityHash) {
			debug('Security check not passed');
			throw new NotFoundException();
		}

		if (!empty($this->data)) {
			$linkData = array(
				'target_url' => $link,
				'target_id' => $targetId,
				'owner_id' => $ownerId,
				'security_level' => $this->data['ShareLink']['security_level'],
			);
			if ($this->data['ShareLink']['hashed_password']) {
				$linkData['hashed_password'] = $this->data['ShareLink']['hashed_password'];
			}
			if (!empty($this->data['ShareLink']['expiration_days'])) {
				$date = date("Y-m-d h:m:s");// current date
				$date = strtotime(date("Y-m-d h:m:s", strtotime($date)) . " +{$this->data['ShareLink']['expiration_days']} day");
				$date = date ( "Y-m-d h:m:s" , $date );
				$linkData['expiration_date'] = $date;
			}
			if (!empty($this->data['ShareLink']['expiration_count'])) {
				$linkData['expiration_count'] = $this->data['ShareLink']['expiration_count'];
			}
			$result = $this->ShareLink->createNew($linkData);
			if (is_array($result)) {
				$this->redirect(array('action' => 'created', $result['ShareLink']['id']));
			} else {
				$this->Session->setFlash('Error creating link');
			}
		} else {
			$this->data['ShareLink']['security_level'] = 1;
		}
		$this->set(compact(array('link', 'targetId', 'ownerId', 'securityHash')));
	}


	public function create() {
		$fields = array(
			'hashed_password', 'security_level', 'expiration_date',
			'expiration_count', 'target_id', 'target_type', 'target_owner',
			'active', 'owner_id', 'count',
		);
		$data = array();
		foreach ($fields as $field) {
			if (!empty($this->params['named'][$field])) {
				$data[$field] = $this->params['named'][$field];
			}
		}
		$result = $this->ShareLink->createNew($data);
		$this->set(array('result' => $result));
	}


	function created($id) {
		$shareLink = $this->ShareLink->findById($id);
		if (!$shareLink) {
			throw new NotFoundException();
		}
		$this->set(compact('shareLink'));
	}


	function view($secretId) {
		$shareLink = $this->ShareLink->get($secretId);
		if (is_string($shareLink)) {
			$this->_renderError($secretId, $shareLink);
		} else {
			switch ($shareLink['ShareLink']['security_level']) {
				case ShareLink::$SECURITY_LEVEL['NONE']:
					$this->_redirectToTarget($shareLink);
				break;
				case ShareLink::$SECURITY_LEVEL['PASSWORD']:
					$this->redirect(array('action' => 'ask_password', $secretId));
				break;
				case ShareLink::$SECURITY_LEVEL['LOGIN']:
					$this->redirect(array('action' => 'view_login', $secretId));
				break;
			}
		}
	}


	function ask_password($secretId) {
		$shareLink = $this->ShareLink->get($secretId);
		$this->set(array('secretId' => $secretId));
		if (is_string($shareLink)) {
			$this->_renderError($shareLink, $shareLink);
		} else {
			if (!empty($this->data['ShareLink']['password'])) {
				// $passwordHasher = new SimplePasswordHasher();
				if ($shareLink['ShareLink']['hashed_password'] == $this->Auth->password($this->data['ShareLink']['password'])) {
					$this->_redirectToTarget($shareLink);
				} else {
					$this->Session->setFlash('Invalid password');
				}
			}
		}
	}


	function view_login($secretId) {
		$shareLink = $this->ShareLink->get($secretId);
		if (is_string($shareLink)) {
			$this->_renderError($secretId, $shareLink);
		} else {
			$this->_redirectToTarget($shareLink);
		}
	}


	function _redirectToTarget($shareLink) {
		$this->ShareLink->increaseCount($shareLink['ShareLink']['id']);
		$this->set(array('shareLink' => $shareLink));
		$this->redirect($shareLink['ShareLink']['target_url']);
	}


	function _renderError($secretKey, $errorCode) {
		$this->set(array(
			'secretKey' => $secretKey,
			'errorCode' => $errorCode,
		));
		if (in_array($errorCode, array('inactive', 'non-existent'))) {
			$this->render('error');
		} else {
			$this->render('expired');
		}
	}


	function ask_renewal($secretKey) {
		$comment = empty($this->data['ShareLink']['renewal_comment']) ? null : $this->data['ShareLink']['renewal_comment'];
		$result = $this->ShareLink->askRenewal($secretKey, $comment);
		switch ($result) {
			case 'not-expired':
				$msg = __('The renewal request was not sent because the link is not expired', true);
			break;
			case 'error-save':
				$msg = __('The renewal request could not be sent due to database error', true);
			break;
			default:
				$msg = __('Renewal request successfully sent', true);
			break;
		}
		$this->set(array('msg' => $msg));
	}


	function find() {
		$named = $this->params['named'];
		if (!empty($named['target_id'])) {
			$shareLinks = $this->ShareLink->getAllForTarget($named['target_id']);
		} elseif (!empty($named['owner_id'])) {
			$onlyWithRenewalRequest = empty($named['filter_renewal']) ? false : true;
			$shareLinks = $this->ShareLink->getAllForOwner($named['owner_id'], $onlyWithRenewalRequest);
		} else {
			debug('not target or owner provided');
			$this->CakeError('error404');
		}
		$this->set(array('shareLinks' => $shareLinks));
	}
	
}
