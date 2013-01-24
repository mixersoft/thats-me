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
class DonateController extends AppController {

/**
 * Controller name
 *
 * @var string
 */
	public $name = 'Donate';

/**
 * This controller does not use a model
 *
 * @var array
 */
	public $uses = array();

	public $layout = 'default';
	public $autoRender = false;
	
	public function Amazon_IPN() {
		$this->log(">>> Amazon_IPN:".print_r($this->data, true), LOG_DEBUG);
	}
	public function PayPal_IPN() {
		$this->log(">>> PayPal_IPN:".print_r($this->data, true), LOG_DEBUG);
	}		
	
}
