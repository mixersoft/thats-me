<?php

class Follower extends AppModel {
	public $displayField = 'email';
	public $order = array('Follower.cohort' => 'desc', 'Follower.email' => 'asc');
	
	public $belongsTo = array(
	);

	public $hasMany = array(
	);

	public $validate = array(
	);
	public function beforeValidate($options) {
		return true;
	}
	public function beforeSave($options) {
		if (!$this->id && !isset($this->data[$this->alias][$this->primaryKey])) {
			// insert only, 
			// get cohort from date, week 1 begins Mon, December 31, 2012
			$starttime = strtotime("2012-12-31 00:00:00");	
			$joindate = !empty($this->data[$this->alias]['created']) ? $this->data[$this->alias]['created'] : date ('Y-m-d H:i:s');
			$weekno_1 = ceil ( (strtotime($joindate) - $starttime) / (86400*7));
			$this->data[$this->alias]['cohort'] = $weekno_1;	
		} else {
			// update
					
		}
		return true;
	}
	
	public function afterSave($created) {
	}

	
}