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
class UsersController extends AppController {

	public $name = 'User';
	public $layout = 'bootstrap';
	public $uses = false;
	public $components = array('RequestHandler', 'Cookie');
	
	public function beforeFilter(){
		parent::beforeFilter();
	}
	
	/*
	 * common Action+View File
	 */ 
	public function _beachfront() {
		$options = array('Android', 'iPod', 'iPhone', 'iPad','Opera Mobi','webOS', 'Windows Phone OS');			
		$pattern = '/(' . implode('|', $options) . ')/i';
		preg_match($pattern, env('HTTP_USER_AGENT'), $match);
		$isTouch = !empty($match) || isset($this->request->query['touch']);
		$isAndroid = preg_match('/Android/i', env('HTTP_USER_AGENT'));
		// override ?touch=0 for testing on mobile
		if (isset($this->request->query['touch']) && $this->request->query['touch']==0) {
			$isTouch = false;
		}
		$isLocal = Configure::read('isLocal');
		$this->set(compact('isTouch', 'isAndroid', 'isLocal'));
	}
	
	public function signout(){
		setcookie ('user', "", time() - 3600);
		$uploadHost = Configure::read('isLocal') ? 'snappi-dev' : 'dev.snaphappi.com';
		// verify cookie by iframe+XHR
		$authUser = isset($_COOKIE['user']) ? json_decode($_COOKIE['user'],true) : array();
		$this->set(compact('authUser', 'uploadHost'));
		$this->_beachfront();
		// $this->redirect("/users/signin", null, true);
	}
	
	
	public function reset(){
		$uploadHost = Configure::read('isLocal') ? 'snappi-dev' : 'dev.snaphappi.com';
		// verify cookie by iframe+XHR
		$authUser = isset($_COOKIE['user']) ? json_decode($_COOKIE['user'],true) : array();
		$this->set(compact('authUser', 'uploadHost'));
		$this->_beachfront();
	}
	
	public function signin(){
		$uploadHost = Configure::read('isLocal') ? 'snappi-dev' : 'dev.snaphappi.com';
		// verify cookie by iframe+XHR
		$authUser = isset($_COOKIE['user']) ? json_decode($_COOKIE['user'],true) : array();
		$this->set(compact('authUser', 'uploadHost'));
		$this->_beachfront(); 
		
	}
	
	public function register(){
		$uploadHost = Configure::read('isLocal') ? 'snappi-dev' : 'dev.snaphappi.com';
		// verify cookie by iframe+XHR
		$authUser = isset($_COOKIE['user']) ? json_decode($_COOKIE['user'],true) : array();
		$this->set(compact('authUser', 'uploadHost'));
		$this->_beachfront(); 
	}
	
	public function upload(){
		$uploadHost = Configure::read('isLocal') ? 'snappi-dev' : 'dev.snaphappi.com';
		// verify cookie by iframe+XHR
		$authUser = isset($_COOKIE['user']) ? json_decode($_COOKIE['user'],true) : array();
		$this->set(compact('authUser', 'uploadHost'));
		$this->_beachfront(); 
		
	}
	
	/**
	 * show MyPhotos
	 * ?flickr for flickr style montage using Nicholas Sherlock imagemontage.js
	 */
	public function snaps(){
		$uploadHost = Configure::read('isLocal') ? 'snappi-dev' : 'dev.snaphappi.com';
		// verify cookie by iframe+XHR
		$authUser = isset($_COOKIE['user']) ? json_decode($_COOKIE['user'],true) : array();
		$this->set(compact('authUser', 'uploadHost'));
		$this->_beachfront(); 
		$this->view = empty($this->request->query['layout']) ? 'flickr' : $this->request->query['layout'];
	}

}
