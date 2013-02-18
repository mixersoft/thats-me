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

/**
 * Static content controller
 *
 * Override this controller by placing a copy in controllers directory of an application
 *
 * @package       app.Controller
 * @link http://book.cakephp.org/2.0/en/controllers/pages-controller.html
 */
class ThatsmeController extends AppController {

/**
 * Controller name
 *
 * @var string
 */
	public $name = 'Thatsme';

/**
 * This controller does not use a model
 *
 * @var array
 */
	public $uses = array();


	public $layout = 'bootstrap';
	public function index() {
		$this->redirect(array('action'=>'home'), null, true);	}
	/*
	 * common Action+View File
	 */ 
	public function beachfront() {
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
	}		// http://thats-me/i-need-this in routes.php
	
	// mapped to 'i-need-this' in routes.php
	public function home(){
		$this->beachfront(); 
	}
	public function features(){
		$this->beachfront(); 
	}
	public function howItWorks(){
		$this->beachfront(); 
	}
	public function seeTheMovie(){
		$this->beachfront(); 
	}
	public function iWantIt(){
		$this->beachfront(); 
	}
	public function about(){
		$this->beachfront(); 
	}	
	public function faq(){
		$this->beachfront(); 
	}
	

/**
 * Displays a view
 *
 * @param mixed What page to display
 * @return void
 */
	public function display() {
		$path = func_get_args();
		$count = count($path);
		if (!$count) {
			$this->redirect('/');
		}
		$page = $subpage = $title_for_layout = null;

		if (!empty($path[0])) {
			$page = $path[0];
		}
		if (!empty($path[1])) {
			$subpage = $path[1];
		}
		if (!empty($path[$count - 1])) {
			$title_for_layout = Inflector::humanize($path[$count - 1]);
		}

		$this->set(compact('page', 'subpage', 'title_for_layout'));
		$this->render(implode('/', $path));
	}
}
