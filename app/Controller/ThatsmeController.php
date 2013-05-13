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
	}		// http://thats-me/i-need-this in routes.php
	
	/*
	 * respond with google AdWords conversion code for iframe
	 * 	INSTEAD of normal markup
	 * expected query_params:
	 * 	&conversion
	 *  &label String AdWords conversion label
	 *  &value Float AdWords conversion value
	 */ 
	public function _ga_conversion_iframe (){
		if (isset($this->request->query['conversion'])){
			$label = $this->request->query['label'];
			$value = $this->request->query['value'];
			if ($label && $value) {
				// label and value must be set to respond with conversion markup
				$this->set(compact('label','value'));
				$this->autoRender = false;
				$this->render('conversion', 'ajax');
			}
		}	
	}

	public function show(){
		$this->autoRender = false;
		if (isset($this->request->query['debug'])) {
			Configure::write('debug', $this->request->query['debug']);
			Configure::write('isLocal', $this->request->query['debug']);
		}
		$this->home();
		$this->render('home');
	}
	
	/**
	 * mapped to '/i-need-this' in routes.php
	 * load all sections in a single page, uses deferred loading
	 */
	public function home(){
		if (isset($this->request->query['debug'])) {
			Configure::write('debug', $this->request->query['debug']);
			Configure::write('isLocal', !empty($this->request->query['isLocal']));
		}
		if (0 && $this->request->url == 'i-need-this') {
			$ga_experiment = '67810021-0';	
			$this->set(compact('ga_experiment'));	
		}
		// setup experiment keys
		$variation_keys = array_fill_keys(array('home','follow'), null);
		$variation = array_intersect_key(array_merge($variation_keys, $this->request->query), $variation_keys);
		
		$hash = true; // for navbar useHash
		
		$this->set(compact('hash','variation'));				
		$this->_beachfront();
		$this->_ga_conversion_iframe();
	}
	/*
	 * load deferred content by XHR after initial section load
	 */ 
	public function home_deferred(){
		if ($this->request->isAjax()) {
			$this->layout = null;
			// setup experiment keys
			$variation_keys = array_fill_keys(array('home','follow'), null);
			$variation = array_intersect_key(array_merge($variation_keys, $this->request->query), $variation_keys);
			
			$hash = true; // for navbar useHash
			
			$this->set(compact('variation'));				
			$this->render('home_deferred');
		} else {
			$this->redirect('/home', null, true);
		}
	}
	
	/**
	 * these actions load sections as individual page
	 */ 
	public function features(){
		$this->_beachfront(); 
		$this->_ga_conversion_iframe();
	}
	public function howItWorks(){
		$this->_beachfront(); 
		$this->_ga_conversion_iframe();
	}
	public function seeTheMovie(){
		$og_description = "Watch the movie to find out how our Trained Editors will save you time and make it fun &amp; easy to re-live the precious moments buried in your Family Photos (50 sec).";
		$og_title = "Snaphappi &middot; See the Movie";
		$this->set(compact('og_description','og_title'));
		$this->_beachfront(); 
		$this->_ga_conversion_iframe();
	}
	public function iWantIt(){
		$this->_beachfront(); 
		$this->_ga_conversion_iframe();
	}
	public function sharing(){
		$this->_beachfront(); 
		$this->_ga_conversion_iframe();
	}
	public function about(){
		$this->_beachfront(); 
	}	
	public function faq(){
		$this->_beachfront(); 
	}
	
	public function conversion() {
		$this->layout = 'ajax';
		$label = $this->request->named['label'];
		$value = $this->request->named['value'];
		if ($label && $value) $this->set(compact('label','value'));
		else $this->autoRender = false;
 	}	
	/*
	 * Timeline demo
	 * use this for content: http://snappi-dev/person/odesk_photos/venice/page:1/perpage:12/sort:0.rating/direction:desc/.json
	 */ 
	public function timeline($idOrUsername='venice'){
		if (!empty($this->request->named['iframe'])) $this->layout = 'bootstrap-iframe';
		$this->set('userid', $idOrUsername);
		$this->_beachfront(); 
	}
	public function story($idOrUsername='venice'){
		if (!empty($this->request->named['iframe'])) $this->layout = 'bootstrap-iframe';
		$this->set('userid', $idOrUsername);
		$this->_beachfront(); 
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
