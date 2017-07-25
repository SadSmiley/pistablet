

		jQuery(function($) {		 

	

		$.fn.themeple_waypoints = function(options_passed)
		{
			if(! $('html').is('.css3transitions')) return;

			var defaults = { offset: '85%' , triggerOnce: true},
				options  = $.extend({}, defaults, options_passed);

			return this.each(function()
			{
				var element = $(this);

				setTimeout(function()
				{
					element.waypoint(function(direction)
					{
					 	$(this).addClass('start_animation').trigger('start_animation');

					}, options );

				},100)
			});
		}; 
		
		//$('.animate_onoffset').not('.parallax_section').themeple_waypoints();
		


		$.fn.great_gallery = function(options)
		{
			return this.each(function()
			{
				var container = $(this), elements = container.find('.item');


				//trigger displaying of thumbnails
				container.on('start_animation', function()
				{
					elements.each(function(i)
					{
						var element = $(this);
						setTimeout(function(){ element.addClass('start_animation') }, (i * 150));
					});
				});
			});
				
		};

		$.fn.recent_portfolio = function(options)
		{
			return this.each(function()
			{
				var container = $(this), elements = container.find('img');


				//trigger displaying of thumbnails
				container.appear( function()
				{
					elements.each(function(i)
					{
						var element = $(this);
						setTimeout(function(){ element.addClass('start_animation') }, (i * 100));
					});
				});
			});
				
		};
		$.fn.chart_skill = function(options)
		{
			
			return this.each(function()
			{
				var container = $(this), elements = container.find('.chart');


				//trigger displaying of thumbnails
				container.appear(function()
				{
					elements.each(function(i)
					{
						var $chart = $(this);
				
						var color = $(this).data('color');
						var color2 = $(this).data('color2');
				
							$chart.easyPieChart({
								lineCap: 'square',
					        	lineWidth: 8, 
					        	size: 120,
					        	trackColor: color2,
					        	scaleColor: false,
					        	barColor: color,
					        	barColor2: color,
					        	animate:2000
					    	});
						
						
					});
				});
			});	
		}

		$.fn.counters = function(options)
		{
			
			return this.each(function()
			{
				var container = $(this), elements = container.find('.count_to .odometer');

				//trigger displaying of thumbnails
				container.appear( function()
				{
					elements.each(function(i)
					{
						var $count = $(this);

						od = new Odometer({
						  el: $count[0],
						  format: '',
						  theme: 'minimal',
						  duration: $count.data('duration')
						});

						od.update($count.data('number'));
												
												
												
					});
				});
			});	


					


		
				
		};
		
		$.fn.services_large = function(options)
		{
			return this.each(function()
			{
				var container = $(this), elements = container.find('.circle');


				//trigger displaying of thumbnails
				container.appear( function()
				{
					elements.each(function(i)
					{
						var element = $(this);
						setTimeout(function(){ element.addClass('start_animation') }, (i * 250));
					});
				});
			});
				
		};


		$.fn.services_medium_new = function(options)
		{
			return this.each(function()
			{
				var container = $(this), elements = container.find('.services_medium_new');


				//trigger displaying of thumbnails
				container.appear( function()
				{
					elements.each(function(i)
					{
						var element = $(this);
						setTimeout(function(){ element.addClass('start_animation') }, (i * 200));
					});
				});
			});
				
		};

		$.fn.services_small = function(options)
		{
			return this.each(function()
			{
				var container = $(this), elements = container.find('.services_small');


				//trigger displaying of thumbnails
			
				container.appear( function()
				{
					elements.each(function(i)
					{
						var element = $(this);
						setTimeout(function(){ element.addClass('start_animation') }, (i * 200));
					});
				});
			});
				
		};

		$.fn.creative_tabs = function(options)
		{
			return this.each(function()
			{
				var container = $(this), elements = container.find('.creative_tabs .navigation li');


				//trigger displaying of thumbnails
				container.on('start_animation', function()
				{
					elements.each(function(i)
					{
						var element = $(this);
						setTimeout(function(){ element.addClass('start_animation') }, (i * 200));
					});
				});
			});
				
		};


		$.fn.images_blocks = function(options)
		{
			return this.each(function()
			{
				var container = $(this), elements = container.find('.media > .media_animation');


				//trigger displaying of thumbnails
				container.appear( function()
				{
					elements.each(function(i)
					{
						var element = $(this);
						setTimeout(function(){ element.addClass('start_animation') }, (i * 250));
					});
				});
			});
				
		};

		$.fn.skills = function(options)
		{
			return this.each(function()
			{
				var container = $(this), 
					
					elements = container.find('.skill');


				//trigger displaying of thumbnails
				container.appear(function()
				{
					
					elements.each(function(i)
					{
						var element = $(this),
						percentage = $(this).data('percentage'),
						element = element.find('.prog');

						
						setTimeout(function(){ element.css('width', percentage+'%'); element.addClass('start_animation') }, (i * 250));

					});
				});
			});
				
		};



		if($.fn.great_gallery)
		{
			$('.great_gallery').great_gallery();
		}

		if($.fn.recent_portfolio) 
		{
			$('.recent_portfolio, #portfolio-preview-items, .content_portfolio').recent_portfolio();
		}

		if($.fn.services_large)
		{
			$('.services_large').parent().services_large();
		}

		if($.fn.images_blocks)
		{
			$('.row-dynamic-el').images_blocks();
		}

		if($.fn.services_medium_new)
		{	
				$('.row-dynamic-el').not('.section-style').services_medium_new();
		}
		
		if($.fn.creative_tabs)
		{	
				$('.row-dynamic-el .animate_onoffset').creative_tabs();
		}

		if($.fn.services_small)
		{
			if($('.section-style.animate_onoffset .services_small').length > 0)
				$('.section-style.animate_onoffset').services_small();
			else
				$('.row-dynamic-el').services_small();
		}

		if($.fn.skills)
		{
			$('.wpb_column').skills();
		}
			
		if($.fn.chart_skill)
		{
			$('.row-dynamic-el').chart_skill();

		}	
				
		if($.fn.counters)
		{
			$('.row-dynamic-el').counters();

		}

			
			
		


		
	});