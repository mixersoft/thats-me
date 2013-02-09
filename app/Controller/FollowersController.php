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
	
	public function signMeUp() {
		setXHRDebug($this,2,true);		if (!empty($this->data)) {
			if (!empty($this->data['Follower']['email'])) {
				$follower = $this->Follower->findByEmail($this->data['Follower']['email']);
				if (!empty($follower['Follower']['id'])) {
					// update, i.e. Follower.cheer=1
					$this->Follower->id = $follower['Follower']['id'];
					// update counts
					if (isset($this->data[$this->alias]['tweet'])) $this->data[$this->alias]['tweet'] =  $follower['Follower']['tweet']+1;
					if (isset($this->data[$this->alias]['fb_like'])) $this->data[$this->alias]['tweet'] =  $follower['Follower']['fb_like']+1;
					if (isset($this->data[$this->alias]['fb_share'])) $this->data[$this->alias]['tweet'] =  $follower['Follower']['fb_share']+1;
				}		
			}
			$ret = $this->Follower->save($this->data, true);
			if ($ret) {
				echo "success";
			} else {
				echo "failed";
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
