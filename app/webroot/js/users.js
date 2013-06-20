/**
 *
 * Copyright (c) 2009-2013, Snaphappi.com. All rights reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the Affero GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * Affero GNU General Public License for more details.
 *
 * You should have received a copy of the Affero GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 *
 * @author Michael Lin, info@snaphappi.com
 *
 *
 */
/*
 * JS for controller: /users
 * NOTE: /users uses iframes to wrap signin/upload features from snappi-dev
 * 		example: snappi-dev/my/upload?min
 * these scripts will run in the window.parent, OUTSIDE the iframe 
 */

$(function() {
	CFG = (typeof CFG == 'undefined')? {} : CFG; 
	/*
	 * helper functions
	 */
	var Util = new function(){}
	Util.uploadHost = /snaphappi.com$/.test(window.location.hostname) ?
			'dev.snaphappi.com' : 'snappi-dev';
	Util.guid = function(){
		function s4() {
		  return Math.floor((1 + Math.random()) * 0x10000)
		             .toString(16)
		             .substring(1);
		};
		 return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}
	Util.activate_dragover = function(target, cfg){
		cfg = cfg || {dragover:'dragover'};
		$.fn.dndhover = function(options) {
			// from http://stackoverflow.com/questions/10867506/dragleave-of-parent-element-fires-when-dragging-over-children-elements
		    return this.each(function() {
		
		        var self = $(this);
		        var collection = $();
		
		        self.on('dragenter', function(event) {
		            if (collection.size() === 0) {
		                self.trigger('dndHoverStart');
		            }
		            collection = collection.add(event.target);
		        });
		
		        self.on('dragleave', function(event) {
		            /*
		             * Firefox 3.6 fires the dragleave event on the previous element
		             * before firing dragenter on the next one so we introduce a delay
		             */
		            setTimeout(function() {
		                collection = collection.not(event.target);
		                if (collection.size() === 0) {
		                    self.trigger('dndHoverEnd');
		                }
		            }, 1);
		        });
		    });
		};
				
		target.dndhover().on({
		    'dndHoverStart': function(event) {
		
		        target.addClass(cfg.dragover);
		
		        event.stopPropagation();
		        event.preventDefault();
		        return false;
		    },
		    'dndHoverEnd': function(event) {
		
		        target.removeClass(cfg.dragover);
		
		        event.stopPropagation();
		        event.preventDefault();
		        return false;
		    }
		});
	}
	
	// TODO: convert to standard bootstrap alert
	Util.notify = (CFG['util'] && CFG['util'].notify);
	Util.flash = function notify(msg) {
		var DURATION = 5000;
			try {
				$('.alert-wrapper .alert').html(msg);
				$('.alert').prepend('<button type="button" class="close" data-dismiss="alert"><i class="icon-remove-sign"></i></button>');
				$('.alert-wrapper').addClass('fadeIn');
				setTimeout(function(){
					$('.alert-wrapper').removeClass('fadeIn');
				}, DURATION)
			} catch (e) {
				throw new Exception('warning: alert block missing');
			}
	};
	Util.if_auth = function(e) {
		try {
			// uses iframe to get current auth from /users/signin/.json
			// see: same origin policy for accessing iframe contents
			document.domain= 'snaphappi.com';
			var inner = $(e.currentTarget).contents().find('body').html();
			var user = JSON.parse(inner);
			Util.isAuth = !!user;
			Util.setUser(user);
		} catch (ex) {
			console.error('iframe checkauth does not work for snappi-dev');
			// assume cookie[user] is valid 
			var user = $.cookie('user');
			Util.isAuth = user && user.uuid;
		}
		
		$(e.currentTarget).remove();	// remove iframe#auth
		return Util.isAuth;
	}
	Util.setUser = function(json) {
		$.cookie.json = true;
		var user = json && json.User || {},
			cookieData;
		// update navbar
		if (user.id) {
			$('.navbar .nav.auth').removeClass('hide');
			$('.navbar .nav .display-name').html(user.displayname);
			$('.navbar .nav.no-auth').addClass('hide');
			cookieData = {
				uuid: user.id,
				username: user.displayname || user.username,
				role: user.primary_group_id,
				count: user.asset_count || 0,
			};
			// update Cookie exp
			$.cookie('user', 
				cookieData,
				{
					expires: 14,
					path: '/',
				}
			);
		} else {
			$('.navbar .nav.no-auth').removeClass('hide');
			$('.navbar .nav .display-name').html('');
			$('.navbar .nav.auth').addClass('hide');
			// update Cookie exp
			$.removeCookie('user', {path: '/'}		);
		}
	}
	
	
	/*
	 * iframe HTML5 message handlers, by action
	 */
	Util.if_onload = function(e){
		$('.iframe-wrap .curtain').remove();
	}
	Util.if_resize = function(cfg, min) {
		cfg = cfg || {};
		min = min || {w:640, h:480};
		if (cfg.h) {
			h = Math.max(cfg.h, min.h);
			$('.featurette iframe').height(h);
		}
		if (cfg.w) {
			w = Math.max(cfg.w, min.w);
			$('.featurette iframe').width(w);
		}
	}
	Util.if_Message = {
		/*
		 *  iframe parent window should call bind to listen to HTML5 messages
		 * 		CFG['users'].if_Message.bind([action]);
		 */ 
		bind : function(action, callback) {
			$(window).bind('message', function(e){
				var json = e.originalEvent.data,
					origin = e.originalEvent.origin;
				Util.if_Message[action](e, json); 
				if ($.isFunction(callback)) callback();
			});
		},
		signin : function (e, json) {
			// TODO: check origin = e.originalEvent.origin;
			try {
				if (json.success){
					if (json.response.User.id) {
						$.cookie.json = true;
						var user = json.response.User;
						$.cookie('user', 
							{
								uuid: user.id,
								username: user.username==user.id ? 'Guest' : user.username,
								role: user.primary_group_id,
								count: user.asset_count || 0,
							},
							{
								expires: 14,
								path: '/',
							});
						var next = !user.asset_count ? '/users/upload'
							: '/users/isotope/'+user.id; 	
						window.location.href = next;
					}
				} else {
					// twBootstrap flash json.message
					$('form #UserPassword').val('');
					// TODO: if originalEvent was 'guest sign in'
					// clear #UserUsername
				};  	
			} catch (ex) {
				alert('bad msg from json response');
			}
		},
		upload : function (e, json) {
			var PLUPLOAD_MARGIN_H = 7,
				PLUPLOAD_MIN_H = 480;
			switch (json.key) {
				case 'resize':
					var height = json.value.h+PLUPLOAD_MARGIN_H;
					Util.if_resize({h:height}, {h:PLUPLOAD_MIN_H});
				break;
			}
		},
		register : function (e, json) {
			var MARGIN_H = 24,
				MIN_H = 480;
			switch (json.key) {
				case 'href':
					window.location.href = json.value;
					break;
				case 'popup':
					// show modal
					$('#markup '+value).removeClass('hide');
					break;
				case 'auth':	
					Util.setUser(json.value);
					setTimeout(function(){
						window.location.href = '/users/signin';
					}, 2000);
					break;
				case 'flash':	
					Util.flash(json.value);
					break;
				case 'resize':
					var height = json.value.h+MARGIN_H;
					Util.if_resize({h:height}, {h:MIN_H});
					break;	
					
			}
		} 
	};
	// documentReady scripts for each action
	Util.documentReady = {
		signin: function(){
			CFG['users'].if_Message.bind('signin');
			_iframe_onLoad = function(e){
				CFG['users'].if_onload(e);
				$('.featurette iframe').removeClass('invisible');
			}
			
			_iframe_auth = function(e){
				var auth = CFG['users'].if_auth(e);
				if (!auth) {
					$('.featurette iframe').attr('src', $('.featurette iframe').attr('qsrc') );
				} else {
					var user = $.cookie('user'),
						next = user.count===0 ? '/users/upload'
									: '/users/isotope/'+user.id; 	
					window.location.href = next;
				}
			}
			$('.featurette iframe').bind('load', _iframe_onLoad);
			if ($.cookie('user')) {
				// auth Cookie[user]
				$('iframe#auth').bind('load', _iframe_auth);
				$('iframe#auth').attr('src', $('iframe#auth').attr('qsrc') );	
			} else {
				$('iframe#auth').remove();
				$('.featurette iframe').attr('src', $('.featurette iframe').attr('qsrc') );
			}
			
		},
		signout: function(){
			_iframe_onLoad = function(e){
				window.location.href = '/users/signin';
			}
			CFG['users'].setUser(false);
			$('iframe#auth').bind('load', _iframe_onLoad);
			$('iframe#auth').attr('src', $('iframe#auth').attr('qsrc') );
		},
		upload: function(){
			CFG['users'].if_Message.bind('upload');
			$(window).bind('resize', function(e){
				try {
					var iframeWin = $('iframe')[0].contentWindow;	
					var rowW = $('.row').width(),
					windowW = $(window).width(),
					w = Math.max(rowW, windowW*0.9);
					$('iframe').width(w);
				} catch (ex) {
				}
			});
			_iframe_onLoad = function(e){
				CFG['users'].if_onload(e);
				var rowW = $('.row').width(),
					windowW = $(window).width(),
					w = Math.max(rowW, windowW*0.9);
				$('.featurette iframe').width(w).removeClass('invisible');
			}
			_iframe_auth = function(e){
				var auth = CFG['users'].if_auth(e);
				if (!auth) {
					window.location.href = '/users/signin';
				} else {
					$('.featurette iframe').attr('src', $('.featurette iframe').attr('qsrc') ); 
				}
			}
			$('.featurette iframe').bind('load', _iframe_onLoad);
			$('iframe#auth').bind('load', _iframe_auth);
			$('iframe#auth').attr('src', $('iframe#auth').attr('qsrc') );
		},
		register: function(){
			CFG['users'].if_Message.bind('register');
			_iframe_onLoad = function(e){
				CFG['users'].if_onload(e);
				$('.featurette iframe').removeClass('invisible');
			}
			
			$('.featurette iframe').bind('load', _iframe_onLoad);
			$('.featurette iframe').attr('src', $('.featurette iframe').attr('qsrc') );
		},
	}
	
	// make global,
	CFG['users'] = $.extend(CFG['users'] || {}, Util);	
	
	
});	


