<?php
/**
 * Routes configuration
 *
 * In this file, you set up routes to your controllers and their actions.
 * Routes are very important mechanism that allows you to freely connect
 * different urls to chosen controllers and their actions (functions).
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
 * @package       app.Config
 * @since         CakePHP(tm) v 0.2.9
 * @license       MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
 Router::parseExtensions('json');
/**
 * Here, we are connecting '/' (base path) to controller called 'Pages',
 * its action called 'display', and we pass a param to select the view file
 * to use (in this case, /app/View/Pages/home.ctp)...
 */
 Router::connect('/', array('controller' => 'thatsme'));
 Router::connect('/i-need-this', array('controller' => 'thatsme', 'action'=>'home'));
 Router::connect('/how-it-works', array('controller' => 'thatsme', 'action'=>'howItWorks'));
 Router::connect('/see-the-movie', array('controller' => 'thatsme', 'action'=>'seeTheMovie'));
 Router::connect('/i-want-it', array('controller' => 'thatsme', 'action'=>'iWantIt'));
 Router::connect('/:action/*', array('controller' => 'thatsme'));
 
 Router::connect('/social/:action/*', array('controller' => 'followers'));
 Router::connect('/donate/:action/*', array('controller' => 'followers'));
	// Router::connect('/', array('controller' => 'pages', 'action' => 'display', 'launchrock'));
/**
 * ...and connect the rest of 'Pages' controller's urls.
 */
	Router::connect('/pages/*', array('controller' => 'pages', 'action' => 'display'));

/**
 * Load all plugin routes.  See the CakePlugin documentation on
 * how to customize the loading of plugin routes.
 */
	CakePlugin::routes();

/**
 * Load the CakePHP default routes. Only remove this if you do not want to use
 * the built-in default routes.
 */
	require CAKE . 'Config' . DS . 'routes.php';
