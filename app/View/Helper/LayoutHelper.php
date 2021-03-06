<?php 
  
 //* /app/View/Helper/LinkHelper.php */
App::uses('AppHelper', 'View/Helper');



class LayoutHelper extends AppHelper { 
     
    var $__blockName = null; 
     
    /** 
     * Start a block of output to display in layout 
     * 
     * @param  string $name Will be prepended to form {$name}_for_layout variable 
     */ 
    function blockStart($name) { 

        if(empty($name)) 
            trigger_error('LayoutHelper::blockStart - name is a required parameter'); 
             
        if(!is_null($this->__blockName) && $this->__blockName !== $name) 
            trigger_error('LayoutHelper::blockStart - Blocks cannot overlap'); 

        $this->__blockName = $name; 
        ob_start(); 
        return null; 
    } 
     
    /** 
     * Ends a block of output to display in layout 
     */ 
    function blockEnd() { 
        $buffer = @ob_get_contents(); 
        @ob_end_clean(); 

        $out = $buffer;  
             
		if (isset($this->_View->viewVars[$this->__blockName.'_for_layout'])) {
			$this->_View->viewVars[$this->__blockName.'_for_layout'] .= $out;
		} else 
        	$this->_View->viewVars[$this->__blockName.'_for_layout'] = $out; 
         
        $this->__blockName = null; 
    } 
     
    /** 
     * Output a variable only if it exists. If it does not exist you may optionally pass 
     * in a second parameter to use as a default value. 
     *  
     * @param mixed $variable Data to ourput 
     * @param mixed $defaul Value to output if first paramter does not exist 
     */ 
    function output($var, $default=null) { 
        if(!isset($var) or $var==null) { 
            if(!is_null($default))  
                echo $default; 
        } else 
            echo $var;     
    } 
     
} 

?>