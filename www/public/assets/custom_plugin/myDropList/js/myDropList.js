// (function( $ ) 
// {
// 	var settings;

// 	$.fn.myPlugin = function(options) 
// 	{
// 		alert(this.html());
// 		settings = $.extend(true, {}, $.fn.myPlugin.defaults, options);
	    
// 	    this.each(function() 
// 	    {
// 	    	$(this).append(define_format(settings.text));
// 	    });

// 		this.css({
// 			color: settings.color,
// 			backgroundColor: settings.backgroundColor
// 		});

// 		this.on("click", function(e)
// 		{
// 			changeCss($(this));
// 		});

// 		return this;
// 	};

// 	function changeCss($this)
// 	{
// 		$this.css(
// 		{
// 			color: 'black',
// 			backgroundColor: 'red' 
// 		})

// 		settings.onClickElement.call();
// 	}

// 	function define_format( txt ) 
// 	{
// 		return "<b>"+txt+"</b>";
//         // if ( window.console && window.console.log ) 
//         // {
//         //     window.console.log( "hilight selection count: " + obj.length );
//         // }
//     };

// 	$.fn.myPlugin.format = function(txt)
// 	{
// 		return "<b>"+txt+"</b>"
// 	};

// 	$.fn.myPlugin.defaults =
// 	{
// 		color: "green",
// 		backgroundColor: "orange",
// 		text: "Some texts",
// 		onClickElement: function(){}

// 	};

// } (jQuery));

(function( $ ) 
{
	var $settings;

	$.fn.globalDropList = function(options, value) 
	{
		$settings = $.extend(true, {}, $.fn.globalDropList.defaults, options);

    var items = this.filter("select:not([multiple])");
    items.each( function(index, value)
    {
    	var $select = $(this);

    	// Preset Options
      if($select.data("options-settings")) {
        $.extend($settings, $select.data("options-settings"));
      }

			// DROPLIST CONTAINER
  		var $this_cont = $select.parents($settings.selector+":first");
  		var input_value = '';

  		var methods   = 
  		{
    		init: function() 
    		{
    		// Initital Setup
					var setup = 
					{
						init: function() 
						{
						  setup.container();
						  setup.value();
						  setup.subcontainer();

						  // When the value of select element change
						  $select.change( function()
								{
									methods.select($select.val(), 'change');
								})
						},

						container: function()
						{
							$this_cont = $("<div/>").addClass($settings.className).css({ width: $settings.width});

							// Selector Container
							$select.before($this_cont);
							$select.appendTo($this_cont);
							// $select.off("change", setup._onchange).change(setup._onchange);

							// STANDARD EVENTS HOVER
							var hover_timeout = null;
							$this_cont.hover(
								function() // WHEN MOUSE HOVER IN
								{
									$this_cont.addClass($settings.className+"-hover");
								}, 
								function() // WHEN MOUSE HOVER OUT (IF HOVER ENABLED)
								{ 
									$this_cont.removeClass($settings.className+"-hover");
								}
							);

							$(document)
								.mouseup(function(e) 
								{
									if($this_cont.is("."+$settings.className+"-open")) 
									{

	                  if(!$this_cont.is("."+$settings.className+"-hover"))
	                  {
                      if($this_cont.is("."+$settings.className+"-no-match") || $this_cont.find("input").val() == "")
                      {
                        methods.removeSelect();
                      }
                      else
                      {
                        val = $this_cont.find("ul li.active.option-hover").data("value");
                        methods.select(val);
                      }
	                  	methods.close();
	                  	methods.clickAddNew();
	                  } 
	                  else $this_cont.find("input").focus();
                	}
								})
						},

						value: function()
						{	
							var input_group 		= $("<div/>").addClass("input-group").appendTo($this_cont);
							var input 					= $("<input/>",
																		{
																			'type': 'text',
																			'class': "form-control input-sm",
																			'placeholder': $settings.placeholder,
                                      'id' : Math.random().toString(36).substring(2,5)
																		}).appendTo(input_group);

              if($select.attr("required"))
              {
                $select.removeAttr("required");
                input.attr("required","required");
              }

							var input_group_btn	= $("<span/>").addClass("input-group-btn").appendTo(input_group);
							var btn_drop				= $("<button/>",
																		{
																			'class': "btn btn-secondary",
																			'type': "button"
																		}).html('&#x25BC;').appendTo(input_group_btn);
							input
								.keyup( function(e)
								{
									// [13=enter : 38=up arrow : 40=down arrow ]
									if($.inArray(e.which, [13,38,40])<0) 
									{
										methods.open();
										methods.search($(this).val());
									}
								})
								.keydown( function(e)
								{
									switch(e.which) 
									{
	                  case 13: // Enter
	                    val  = $this_cont.find("ul li.active.option-hover").data("value");
                      methods.select(val);
                      methods.clickAddNew();
	                  break;
	                  case 38: // Up
	                  	methods.selectUp();
	                  break;
	                  case 40: // Down
	                  	methods.selectDown();
	                  break;
	                  case 27: // Esc
	                    methods.close();
	                  break;
                    case 9: // Tab
                      methods.close();
                    break;
	                  default:
	                    return true;
	                  break;
                	}

                e.preventDefault();
                return false;
								})
								.focus(function(e)
								{
									methods.remain_toggle();
								})


							// TOGGLE SELECT BOX
							btn_drop.click( function()
							{
								methods.toggle();
							});
						},

						subcontainer: function() 
						{
							// SUB-CONTAINER
							var subcont = $("<div/>").addClass($settings.classSubName).appendTo($this_cont);

							// SUB-CONTAINER-LIST
							var subcont_list = $("<div/>").addClass($settings.classSubList).css({ maxHeight: $settings.maxHeight }).appendTo(subcont);

							// ADD-NEW OPTION
							if($settings.hasPopup == 'true')
							{
								var list_add_new = $("<span/>",
																	{
																		'class' 		: "popup",
																		'link'			: $settings.link,
																		'orig_link'	: $settings.link
																	})
																	.attr('size',$settings.link_size)
																	.appendTo(subcont_list);

								var list_add_new_icon = $("<i/>",
																				{
																					'class'	: $settings.addNewIcon
																				}).appendTo(list_add_new);

                var list_add_new_value = $("<span/>",
                                        {
                                          'class' : "add-new",
                                          'html'  : $settings.addNewName
                                        }).appendTo(list_add_new);
																			

								$("<hr/>").appendTo(subcont_list);

								// CHANGE THE DATA OF THE LINK ATTRIBUTE
								list_add_new.click(function()
								{
									
									var value = $this_cont.find(".add-new").text();
									value 		= value.replace($settings.addNewName, '');
									value 		= value.replace($settings.addNewChange+' ', '');
									orig_link = $this_cont.find(".popup").attr("orig_link");
									if(value != '') $(this).attr("link", orig_link+"?value="+encodeURIComponent(value));
									else $(this).attr("link", orig_link);
                  $select.data("options-settings").onCreateNew.call($select);
									methods.close();
								})
							}

							// OPTION LIST
              methods.load_select_data();

              subcont_list.css(
              {
                "overflow-y": "scroll"
              });

              subcont_list.scroll(function()
              {
              	subcont_list.css(
	              {
	                "overflow-y": "visible"
	              });
              })

						}

					}

					if($select.is("select:not([multiple])") && !$select.data("options-settings"))
					{
						setup.init();
					}
				},

        load_select_data: function()
        {
          var subcont_list = $this_cont.find("."+$settings.classSubList);
          var list_ul      = $("<ul/>").appendTo(subcont_list);
          
          methods.recursion_list(list_ul);

          var list_li = list_ul.find("li");


          $("<li/>", 
          {
            'class': 'no-results',
            'value': 'empty',
            'text':   $settings.no_result_message
          }).appendTo(list_ul);

          $("<li/>", 
          {
            'class': 'hidden',
            'value': '',
          }).appendTo(list_ul);

          list_li.click(function() 
          {
            methods.select($(this).data("value"));
          });
        },

        recursion_list: function(list_ul)
        {
          var has_selected_attr = false;
          $select.find("option").each( function(indx)
          {
            var val       = $(this).attr("value");
            var indent    = $(this).attr("indent");
            var search    = $(this).attr("add-search");
            var txt       = $(this).text();
            var disabled  = $(this).is("disabled");  
            var list      = $("<li/>", 
                          {
                            'class': ($(this).hasClass("hidden") ? ' hidden' : 'active') 
                            + (indx==0 ? ' option-hover' : '')
                            + ($(this).is(":disabled") ? ' option-disabled' : ''),
                            'data-value': val,
                            'text':       txt,
                            'search': search
                          }).appendTo(list_ul);

            if(indent && indent > 0)
            {
              list.css(
              {
                'padding-left': indent*20+"px"
              })
            }
            if($(this).attr("selected"))
            {
              has_selected_attr = true;
              methods.select(val);
            }
          })

          if(!has_selected_attr)
          { 
            $select.val('');
          }
        },

				// Open/Close Select Box
        toggle: function() 
        {
          if($this_cont.is("."+$settings.className+"-open")) 
          {
            methods.close();
          }
          else
          {
          	$this_cont.find("input").focus();
            methods.open();
          }
        },

        remain_toggle: function() 
        {
          if($this_cont.is("."+$settings.className+"-open")) 
          {
          	methods.open();
          }
          else 
          {
            methods.close();
          }
        },

				// OPEN SELECT BOX
        open: function() 
        {
          $this_cont.addClass($settings.className+"-open");
          $this_cont.find("ul li.no-results").hide();
          if($this_cont.find("input").val() != '')
          {
            methods._selectMove($select.get(0).selectedIndex);
          }
        },

				// CLOSE SELECT BOX
        close: function() 
        {
          $this_cont.removeClass($settings.className+"-open");
          $this_cont.find("ul li").not(".no-results").addClass("active");
        },

        search: function(value)
        {
        	value = $.trim(value.toLowerCase());
          var noresults = $this_cont.find("ul li.no-results").hide();

        	// var options = $this.find("ul li").not(".no-results");
        	var options = $this_cont.find("ul li"); 
        	var new_val = true; //IF THE VALUE IS NOT ON THE LIST

          options.each(function() {
            var text = ($(this).text()+"").toLowerCase();
            text = $.trim(text);
            var val  = ($(this).data("value")+"").toLowerCase();
            var add_search  = ($(this).attr("search")+"").toLowerCase();
            var add  = false;

            if(value == text)
            {
            	add 		= true;
            	new_val = false;
            }
            else if(text.indexOf(value) >= 0) 
            {
              add = true;
            }
            if(add_search.indexOf(value) >= 0)
            {
              add = true;
            }

            add ? $(this).addClass("active") : $(this).removeClass("active");
          });

          if(new_val)
          {
          	$this_cont.addClass($settings.className+"-no-match");
          	methods.setAddNew(true);
          	var scroll = $this_cont.find("."+$settings.classSubList);
          	scroll.scrollTop(0);
          }
          else
          {
          	$this_cont.removeClass($settings.className+"-no-match");
          	methods.setAddNew(false);
          }

          options = options.filter(".active").filter(":visible");


          if(options.length > 0) {
            // Select First Result
            methods._selectMove(0);
          }
          else {
            // No Results
            noresults.show();
          }
        },

        // SELECT OPTION
        select: function(value, action = 'close') 
        {
          var input_elem  = $this_cont.find("input");

          if(!methods.isDisabled(value))
          {
            if($select.val() != value)
            {
              $select.val(value);
              $select.data("options-settings").onChangeValue.call($select);
              methods.setAddNew(false);
            }

            if(action == 'change')
            {
              $select.data("options-settings").onChangeValue.call($select);
            }

            var option  		= $select.find("option:selected");
            input_elem.val($.trim(option.text())).change();

            if(action == 'close')
            {
            	methods.close();
        	  }
          }
          else
          {
            $option = $this_cont.find("ul li.active[data-value='" + value + "']");
            input_elem.val($.trim($option.text()))
            $this_cont.addClass($settings.className+"-no-match");
            methods._selectMove($option.index());
          }
        },

        isDisabled: function($value)
        {
          $option = $this_cont.find("ul li.active[data-value='" + $value + "']");
          if($option.is(".option-disabled")) return true;
          else return false;
        },

        removeSelect: function()
        {
          $select.val('').change();
          $this_cont.find("input").val('');
          $this_cont.find("ul li").removeClass("option-hover");
          methods.setAddNew(false);
        },

        // SET ADD NEW BUTTON
        setAddNew: function(hasValue)
        {
        	if(hasValue == true) // IF THE VALUE IS NOT EMPTY OR NOT IN THE LIST
        	{
	        	var input_value	= $this_cont.find("input").val();
	        	$this_cont.find(".add-new").text($settings.addNewChange+" "+input_value);
        	}
        	else
        	{
            $this_cont.removeClass($settings.className+"-no-match");
        		$this_cont.find(".add-new").text($settings.addNewName);
        	}
        },

        clickAddNew: function()
        {
        	var options   = $this_cont.find("ul li.no-results");

        	if($this_cont.is("."+$settings.className+"-no-match") && options.is(":visible"))
        	{
        		$select.val('');
        		$this_cont.find(".popup").trigger("click");
        	}
        },

        //  MOVE SELECTION UP
        selectUp: function() 
        {
          var options   = $this_cont.find("ul li.active").not(".no-results");
          var selected  = options.index(options.filter(".option-hover"));

          var moveTo = selected - 1;
          moveTo = moveTo < 0 ? options.length - 1 : moveTo;

          //SELECT VALUE
          methods.select(options.eq(moveTo).data("value"), 'open');

          $this_cont.find("."+$settings.classSubList).css(
          {
            "overflow-y": "scroll"
          });

          methods._selectMove(moveTo);
        },

        // MOVE SELECTION DOWN
        selectDown: function() 
        {
          var options   = $this_cont.find("ul li.active").not(".no-results, .hidden");
          var selected  = options.index(options.filter(".option-hover"));

          var moveTo = selected + 1;
          moveTo = moveTo > options.length - 1 ? 0 : moveTo;

          //SELECT VALUE
          methods.select(options.eq(moveTo).data("value"), 'open');

          $this_cont.find("."+$settings.classSubList).css(
          {
            "overflow-y": "scroll"
          });

          methods._selectMove(moveTo);
        },

        // DESTROY
        destroy: function() {
          if($select.data("options-settings")) {
            $select.removeData("options-settings").insertAfter($this_cont);
            $this_cont.remove();
          }
        },

        // MOVE SELECTION TO INDEX
        _selectMove: function(index) 
        {
          var options   = $this_cont.find("ul li.active");

          options.removeClass("option-hover").eq(index).addClass("option-hover");

          var scroll = $this_cont.find("."+$settings.classSubList);
          if(scroll.css("overflow-y") == "scroll") 
          {
            scroll.scrollTop(0);

            var selected = options.eq(index);
            if(selected.length)
            {
            	offset = selected.offset().top + selected.outerHeight() - scroll.offset().top - scroll.height();

            	if(offset > 0) 
	            {
	              scroll.scrollTop(offset);
	            }
          	}
            
          }
        },

        reload: function() {
          if($select.data("options-settings")) 
          {

            var input = $this_cont.find("input").val();
            var value = $this_cont.find('ul li:contains(' +input +')').attr("data-value");

          	$this_cont.find(".droplist-container-list ul").remove();
            methods.load_select_data();

            if(value != '' || value != null)
            {
              methods.select(value);
            }
          }
        },

        clear: function(){
          if($select.data("options-settings")) 
          {
            $this_cont.find(".input-group input").val('');
          }
        },

        disabled: function() {
          if($select.data("options-settings")) 
          {
            $this_cont.find("input").attr("disabled","disabled");
            $this_cont.find(".input-group-btn button").attr("disabled","disabled");
          }
        },

        enabled: function() {
          if($select.data("options-settings")) 
          {
            $this_cont.find("input").removeAttr("disabled");
            $this_cont.find(".input-group-btn button").removeAttr("disabled");
          }
        }
    	}

	    var call_method = options;

			// Check for Additional Options
			if(call_method && typeof call_method == "object") 
			{
				call_method = "init";
				value       = null;
			}

			$settings.selector = "."+$settings.className;

			// Load Requested Method
			call_method = call_method ? call_method : "init";
			if(typeof methods[call_method] == "function") 
			{
				methods[call_method].call(this, value);
			}

			if(call_method != "destroy") 
			{
				$select.data("options-settings", $settings);
			}

      // console.log($select.data("options-settings"));
      // console.log($settings.onCreateNew);
    })
    
		return this;
	};

	$.fn.globalDropList.defaults =
	{
		className         	: "droplist",
		classSubName				: "droplist-container",
		classSubList				: "droplist-container-list",
		addNewName					: "Add New",
		addNewChange				: "Add",
		addNewIcon					: "fa fa-plus",
		width								: "320px",
    maxHeight           : "129px",
		hasPopup						: "true",
		link 								: "/member/customer/modalcreatecustomer",
		link_size 					: "lg",
		placeholder					: "Search....",
		no_result_message		: 'No result found!',
		onChangeValue       : function(){},
		onCreateNew         : function(){}

	};

} (jQuery));
