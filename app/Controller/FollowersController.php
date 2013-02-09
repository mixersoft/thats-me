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
App::uses('CakeEmail', 'Network/Email');

/**
 * Static content controller
 *
 * Override this controller by placing a copy in controllers directory of an application
 *
 * @package       app.Controller
 * @link http://book.cakephp.org/2.0/en/controllers/pages-controller.html
 */
class FollowersController extends AppController {

	public $name = 'Follower';
	public $layout = 'default';
	public $components = array('RequestHandler');
	
	public function beforeFilter(){
		if ($this->request->is('ajax')) {
			Configure::write('debug',0);
			$this->response->disableCache();
		}
	}
	
	
	public function _email_welcome($address) {
		$email = new CakeEmail('social_at_gmail');
		$email->template('welcome')
			->emailFormat('both')
			->from(array('social@snaphappi.com' => 'Snaphappi'))
			->to($address)
			->subject('Welcome to Snaphappi!');
		// $email->helpers(array('Html', 'Custom', 'Text'));			$email->viewVars(compact('address'));
		return $email->send();
	}
	/**
	 * post to /followers/signMeUp.json for json response, using json view
	 */
	public function signMeUp() {
		setXHRDebug($this,0,false);		if (!empty($this->data)) {
			$data = $this->data;
			if (!empty($this->data['Follower']['email'])) {
				$follower = $this->Follower->findByEmail($this->data['Follower']['email']);
				if (!empty($follower['Follower']['id'])) {
					// update, i.e. Follower.cheer=1
					$this->Follower->id = $follower['Follower']['id'];
					// update counts
					if (isset($this->data['Follower']['tweet']))  $follower['Follower']['tweet'] += 1;
					if (isset($this->data['Follower']['fb_like'])) $follower['Follower']['fb_like'] += 1;
					if (isset($this->data['Follower']['fb_share'])) $follower['Follower']['fb_share'] += 1;
					$data = array('Follower'=>array_intersect_key($follower['Follower'], $this->data['Follower']));
				}		
			}
			$ret = $this->Follower->save($data, true);
			$response = isset($ret['Follower']) ? $ret['Follower'] : $ret;
			$success = !empty($ret);
			$json = compact('success', 'response');
			$this->set(compact('json', 'success', 'response'));
			/*
			 * for json response?
			 * return new CakeResponse(array('body' => json_encode($array)));
			 */
			 
			 if ($success) {
			 	try {
				 	// TODO: send emails from queue
					if (!empty($ret['Follower']['cheer']) && empty($follower['Follower']['email_cheer'])) 
					{
						$this->_email_cheer($ret['Follower']['email']);
						// TODO: update DB
						$this->Follower->saveField('email_cheer', 1);
					}  
					else if (!empty($this->data['Follower']['join']) && empty($follower['Follower']['email_welcome'])) 
					{
						$ret = $this->_email_welcome($ret['Follower']['email']);	
						// TODO: update DB
						$this->Follower->saveField('email_welcome', 1);
					}
				} catch(SocketException $e) {
					// email failed;
					$this->log("Send Email failed for address={$ret['Follower']['email']}", LOG_DEBUG);
				}	
			}
		}
	}
	
	public function Amazon_IPN() {
		$this->log(">>> Amazon_IPN:".print_r($this->data, true), LOG_DEBUG);
	}
	public function PayPal_IPN() {
		$this->log(">>> PayPal_IPN:".print_r($this->data, true), LOG_DEBUG);
	}		
	
}
