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
	public $components = array('RequestHandler', 'Cookie');
	
	public function beforeFilter(){
		parent::beforeFilter();
		if ($this->request->is('ajax')) {
			Configure::write('debug',0);
			$this->response->disableCache();
		}
		$this->Cookie->time = '1 month';
		// $this->Cookie->domain = '.snaphappi.com';	}
	
	
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
	
	public function _email_cheer($address) {
		$email = new CakeEmail('social_at_gmail');
		$email->template('cheer')
			->emailFormat('both')
			->from(array('social@snaphappi.com' => 'Snaphappi'))
			->to($address)
			->subject('Welcome to Snaphappi and thanks for the cheer!');
		// $email->helpers(array('Html', 'Custom', 'Text'));	
		$email->viewVars(compact('address'));
		return $email->send();
	}
	
	/*
	 * should call from IPN response
	 * 	NOTE: or call from #thank-you hash until IPN response properly implemented
	 */ 
	public function _send_ipn_email($email) {
		$follower = $this->Follower->findByEmail($email);
		if (!empty($follower['Follower']['id'])) {
			$success = true;
		} 
		if ($success && !empty($follower) && empty($follower['Follower']['email_cheer'])) 
		{
			try {
				$this->_email_cheer($follower['Follower']['email']);	
				// TODO: update DB
				$this->Follower->id = $follower['Follower']['id'];
				$this->Follower->saveField('email_cheer', 1);
			} catch(SocketException $e) {
				// email failed;
				$this->log("Send Email:cheer failed for address={$follower['Follower']['email']}", LOG_DEBUG);
				$success = false;
			}	
		}
		return $success;
	}
	/**
	 * post to /followers/signMeUp.json for json response, using json view
	 */
	public function signMeUp() {
		setXHRDebug($this,0,false);
		if (!empty($this->data)) {
			$data = $this->data;
			if (empty($data['Follower']['email'])) {
				// get email address from cookie
				$data['Follower']['email'] = $this->Cookie->read('email');
			}
			if (!empty($data['Follower']['email'])) {
				$follower = $this->Follower->findByEmail($data['Follower']['email']);
				if (!empty($follower['Follower']['id'])) {
					// update, i.e. Follower.cheer=1
					$this->Follower->id = $follower['Follower']['id'];
					// update cheer, only update if > old value
					if (isset($data['Follower']['cheer']) 
						&& $data['Follower']['cheer'] > $follower['Follower']['cheer'])
					{	
						$follower['Follower']['cheer'] = $data['Follower']['cheer'];
					}  
					// update counts
					if (isset($this->data['Follower']['tweet']))  $follower['Follower']['tweet'] += 1;
					if (isset($this->data['Follower']['fb_like'])) $follower['Follower']['fb_like'] += 1;
					if (isset($this->data['Follower']['fb_share'])) $follower['Follower']['fb_share'] += 1;
					$data = array('Follower'=>array_intersect_key($follower['Follower'], $data['Follower']));
				}		
			}
			// save email as Cookie for #welcome or #not-yet
			
			
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
			 	$this->Cookie->write('email', $ret['Follower']['email']);
			 	try {
				 	// TODO: send emails from queue
					if (!empty($ret['Follower']['cheer']) 
						&& $ret['Follower']['cheer']==4				// success determined by #thank-you
						&& empty($follower['Follower']['email_cheer'])) 
					{
						// TODO: wait for IPN post to send email,
						$email_success = $this->_send_ipn_email($ret['Follower']['email']);
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
		setXHRDebug($this,0,false);
		$postData = $_POST;
		if (!empty($postData)) {
			$success = false;
			/*
			 * ???: how do we connect an Amazon IPN post to the user's email
			 */
			$email = $postData['buyerEmail'];
			if ($email) $email_success = $this->_send_ipn_email($email);
			$this->response->statusCode(200);
			echo "ok";
		} else {
			$this->response->statusCode(400);
			echo "error";
		} 
		$this->log(">>> Amazon_IPN _POST".print_r($postData, true), LOG_DEBUG);
		$this->autoRender = false;	
	}
	
	/* TODO: respond to paypal accordingly, currently disabled */
	public function PayPal_IPN() {
		setXHRDebug($this,0,false);
		$postData = $_POST;
		if (!empty($postData)) {
			$success = false;
			/*
			 * ???: how do we connect an Amazon IPN post to the user's email
			 */
			$email = $postData['email'];
			if ($email) $email_success = $this->_send_ipn_email($email);
			$this->response->statusCode(200);
			echo "ok";
		} else {
			$this->response->statusCode(400);
			echo "error";
		} 
		$this->log(">>> PayPal_IPN _POST".print_r($_POST, true), LOG_DEBUG);
		$this->autoRender = false;		
	}
	
	
}
