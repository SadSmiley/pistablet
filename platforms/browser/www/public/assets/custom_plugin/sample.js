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

	$.fn.myDropList = function(options, value) 
	{
		$settings = $.extend(true, {}, $.fn.myDropList.defaults, options);

    var items = this.filter("select:not([multiple])");

    items.each( function(index, value)
    {
    	var $select = $(this);

    	// Preset Options
      if($select.data("cs-options")) {
        $.extend($options, $select.data("cs-options"));
      }

			// DROPLIST CONTAINER
  		var $this_cont = $select.parents($settings.selector+":first");

  		var methods   = {
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
						  // setup.value();
						  // setup.subcontainer();
						},

						container: function()
						{
							$this_cont = $("<div/>").addClass($settings.className);

							// Selector Container
							$select.before($this_cont);
							$select.appendTo($this_cont);
							// $select.off("change", setup._onchange).change(setup._onchange);

							// STANDARD EVENTS HOVER
							var hover_timeout = null;
							$this_cont.hover(
								function() // WHEN MOUSE HOVER IN
								{
									// if(hover_timeout) clearTimeout(hover_timeout);
									$this_cont.addClass($settings.className+"-hover");
								}, 
								function() // WHEN MOUSE HOVER OUT (IF HOVER ENABLED)
								{ 
									// if("hoveropen" == "hoveropen") hover_timeout = setTimeout(methods.close, 750);
									$this_cont.removeClass($settings.className+"-hover");
								}
							);

							$(document)
								.mouseup(function(e) 
								{
									if($this_cont.is($settings.selector+"-open")) 
									{
										//methods.close();
									}
									else 
									{
										$this_cont.find("input").focus();
									}
								})
								.keydown(function(e)
								{
									switch(e.which) 
									{
	                  case 13: // Enter
	                    val       = $this_cont.find("ul li.active.option-hover").data("value");
	                    methods.select(val);
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
	                  default:
	                    return true;
	                  break;
                	}

                e.preventDefault();
                return false;
								})
						},

						value: function()
						{	
							var input_group 		= $("<div/>").addClass("input-group").appendTo($this_cont);
							var input 					= $("<input/>",
																		{
																			'type': 'text',
																			'class': "form-control ",
																			'placeholder': $settings.placeholder
																		}).appendTo(input_group);
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
	                    val       = $this_cont.find("ul li.active.option-hover").data("value");
	                    methods.select(val);
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
	                  default:
	                    return true;
	                  break;
                	}

                e.preventDefault();
                return false;
								})
								.focus( function(e)
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
							var subcont_list = $("<div/>").addClass($settings.classSubList).appendTo(subcont);

							// ADD-NEW OPTION
							if($settings.hasPopup)
							{
								var list_add_new = $("<span><i class='"+$settings.addNewIcon+"'>"+$settings.addNewName+"</i></span><hr>")
																	.addClass("popup")
																	.attr("link", $settings.link)
																	.attr("size", $settings.link_size)
																	.appendTo(subcont_list);
							}

							// OPTION LIST
							var list_ul			 = $("<ul/>").appendTo(subcont_list);
							$select.find("option").each( function(indx)
							{
								var val 			= $(this).attr("value");
								var txt 			= $(this).text();
								var disabled 	= $(this).is("disabled");
								$("<li/>", 
								{
                  'class':'active'
                  + (indx==0 ? ' option-hover' : '')
                  + ($(this).is(":disabled") ? ' option-disabled' : ''),
                  'data-value': val,
                  'text':       txt
              	}).appendTo(list_ul);
							})

							list_ul.find("li").click(function() 
							{
                methods.select($(this).data("value"));
              });

							$("<li/>", 
            	{
                'class':  'no-results',
                'text':   "No results"
              }).appendTo(list_ul);
						}

					}
					if($select.is("select:not([multiple])") && !$select.data("cs-options")) 
					{
						setup.init();
					}
				},

				// Open/Close Select Box
        toggle: function() {
          if($this_cont.is($settings.selector+"-open")) 
          {
            methods.close();
          }
          else 
          {
            methods.open();
          }
        },

        remain_toggle: function() {
          if($this_cont.is($settings.selector+"-open")) 
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
          methods._selectMove($select.get(0).selectedIndex);
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

          // Search for Match
        	// var options = $this.find("ul li").not(".no-results");
        	var options = $this_cont.find("ul li");

          options.each(function() {
            var text = ($(this).text()+"").toLowerCase();
            var val  = ($(this).data("value")+"").toLowerCase();
            var add  = false;

            if(text.indexOf(value) >= 0) 
            {
              add = true;
            }

            add ? $(this).addClass("active") : $(this).removeClass("active");
          });

          options = options.filter(".active").filter(":visible");

          // // Set Scroll
          // $this.find("div div").css({
          //   "overflow-y": options.length > $options.numitems ? "scroll" : "visible"
          // });

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
        select: function(value) {
          if($select.val() != value) 
          {
            $select.val(value).change();
          }
          var option  		= $select.find("option:selected");
          var input_elem  = $this_cont.find("input");
          input_elem.val(option.text().length > 0 ? option.text() : $settings.empty_text);
          methods.close();
        },

        // Move Selection Up
        selectUp: function() {
          var options   = $this_cont.find("ul li.active").not(".no-results");
          var selected  = options.index(options.filter(".option-hover"));

          var moveTo = selected - 1;
          moveTo = moveTo < 0 ? options.length - 1 : moveTo;

          methods._selectMove(moveTo);
        },

        // Move Selection Down
        selectDown: function() {
          var options   = $this_cont.find("ul li.active").not(".no-results");
          var selected  = options.index(options.filter(".option-hover"));

          var moveTo = selected + 1;
          moveTo = moveTo > options.length - 1 ? 0 : moveTo;

          methods._selectMove(moveTo);
        },

        // Move Selection to Index
        _selectMove: function(index) 
        {
          var options   = $this_cont.find("ul li.active");
          options.removeClass("option-hover").eq(index).addClass("option-hover");

          var scroll = $this_cont.find("div div");
          if(scroll.css("overflow-y") == "scroll") 
          {
            scroll.scrollTop(0);

            var selected = options.eq(index);
            offset = selected.offset().top + selected.outerHeight() - scroll.offset().top - scroll.height();

            if(offset > 0) 
            {
              scroll.scrollTop(offset);
            }
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
				$select.data("cs-options", $settings);
			}
    })

		return this;
	};

	$.fn.myDropList.defaults =
	{
		className         	: "droplist",
		classSubName				: "droplist-container",
		classSubList				: "droplist-container-list",
		addNewName					: "Add New",
		addNewIcon					: "fa fa-plus",
		hasPopup						: "true",
		link								: "/member/customer/modalcreatecustomer",
		link_size						: "lg",
		placeholder					: "Search....",
		numitems						: 5,
		search 							: true,
		no_result_message		: 'No result found!',
		empty_text 					: "empty",
		onClickElement: function(){},
		onChangeElement: function(){}

	};

} (jQuery));
