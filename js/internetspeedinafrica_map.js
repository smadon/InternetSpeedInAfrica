/*** Pop Up for Social Link ***/
var newwindow;
function poptastic(url)
{
	newwindow=window.open(url,'name','height=400,width=400','resizable=yes','scrollbars=yes','toolbar=yes','status=yes');
	if (window.focus) {newwindow.focus()}
}


/*** Main PopUp when we open the web site ***/
/*** Source: https://codepen.io/andrearufo/pen/dyKJG ***/
$(document).ready(function(){
  
  //chiusura al click sulla parte scura
  $("#hover").click(function(){
		$(this).fadeOut();
    $("#popup").fadeOut();
	});
  
  //chiusura al click sul pulsante
  $("#close").click(function(){
		$("#hover").fadeOut();
    $("#popup").fadeOut();
	});
  
});


/*** Global object that contains the app ***/
var app = app || {};

// keep our map stuff in a part of the app object as to not pollute the global name space
app.map = (function(w,d, $, _){

  /*** local variables for map parts and layers ***/
  var el = {
    map : null,
    cdbURL : null,
    styles: null,
    sql : null,
    VariousInternetSpeed : null,
    InternetProvider : null,
    SubmarineOpticalFiber : null,
    TerrestrialOpticalFibre : null
  };

  // reference cartocss styles from mapStyles.js
  el.styles = app.mapStyles;
  
 // url to cartodb heritierdamien InternetSpeed map viz json
 el.cdbURL = "https://heritierdamien.carto.com/api/v2/viz/2455baa2-39df-11e6-9ae5-0e31c9be1b51/viz.json";
        
 el.sql = {
			all : "SELECT * FROM internetspeedinafricadata" ,  // Internet Speed Per Country : internetspeed -- Akamai Open Data
			ais1 : "SELECT * FROM internetspeedinafricadata" ,  // Internet Speed Per Country : internetspeed -- Akamai Open Data
 			ais2 : "SELECT * FROM internetspeedinafricadata" ,  // Internet Speed Per Country : internetspeed -- XXX Open Data
   			ais4 : "SELECT * FROM internetspeedinafricadata" ,  // Internet Speed Per Country : internetspeed -- IUT Open Data     
  };		 
  // set up the map
  var initMap = function() {
    // map paramaters
    var params = {
      center : [0, 20],			// Africa
      minZoom : 3,				// Max zoom Out
      maxZoom : 20,				// Max zoom In
      zoom : 4, 			    // show only Africa continent
    //  maxBounds : L.latLngBounds([40.670809,-73.952579],[40.713565,-73.870354]),
      cartodb_logo: false, 		// No Carto DB Logo
      legends: false			// No Legend from Carto DB
    }
    // instantiate the Leaflet map - No Need
    // el.map = L.map('map', params);
    // el.tonerLite = new L.StamenTileLayer('toner-lite');
    // add stamen toner layer as default base layer
    // el.map.addLayer(el.tonerLite);
    // add the tax lot layer from cartodb
    getCDBData(params); 
  } 
  
  // function to load map Internet Speed layer
  // from CartoDB 
  var getCDBData = function(mapOptions) {  
    cartodb.createVis('map', el.cdbURL, mapOptions, {
	    https: true, 			// HTTPS data
        cartodb_logo: false, 
        legends: false
      }, 
      function(vis, layers) {
        // store the Main Internet Speed map SubLayer
        layer = layers[1];
        el.VariousInternetSpeed = layer.getSubLayer(0);

        // show Internet Provider sublayer
        el.InternetProvider = layer.createSubLayer({
          interactivity: ['country'],
            sql: "SELECT * FROM buildings WHERE country IN ('nigeria','ethiopia','egypt','congo-rep-','south-africa','tanzania','kenya','algeria','uganda','sudan','morocco','ghana','mozambique','ivory-coast','madagascar','angola','cameroon','niger','burkina-faso','mali','malawi','zambia','senegal','zimbabwe','chad','guinea','tunisia','rwanda','south-sudan','benin','somalia','burundi','togo','libya','sierra-leone','central-african-rep','eritrea','congo-dem-rep','liberia','mauritania','gabon','namibia','botswana','lesotho','equatorial-guinea','gambia','guinea-bissau','mauritius','swaziland','djibouti','reunion','comoros','cape-verde','mayotte','sao-tome-and-principe','seychelles')", // IPX	
			cartocss: "#buildings{marker-fill: #FF3300; marker-width: 5; marker-line-color: white; marker-line-width: 0;}",
			interactivity: ['cartodb_id','address','country','name', 'website', 'phone']			
		});

        // show Submarine Optical Fiber (sof) sublayer
        el.SubmarineOpticalFiber = layer.createSubLayer({
			interactivity: ['address'],
            sql: "SELECT * FROM auc", // undersea cables
            cartocss: '#auc{line-color: #EDF8FB;line-width: 2;line-opacity: 0.8;} #auc [ capacity_g <= 48000] {line-color: #005824;} #auc [ capacity_g <= 17000] {line-color: #238B45;} #auc [ capacity_g <= 4280] {line-color: #41AE76;} #auc [ capacity_g <= 1600] {line-color: #66C2A4;} #auc [ capacity_g <= 540] {line-color: #CCECE6;} #auc [ capacity_g <= 310] {line-color: #D7FAF4;} #auc [ capacity_g <= 60] {line-color: #EDF8FB;}' 		  
        });

        // show terrestrial Optical Fibre (tof) sublayer
        el.TerrestrialOpticalFibre = layer.createSubLayer({
            sql: "SELECT af_fibrephase.*,af_organisation.name as orgname, af_organisation.web_url as weburl FROM af_fibrephase, af_organisation WHERE af_fibrephase.operator_id = af_organisation.organisation_id", // fibre phases
			cartocss: '#af_fibrephase{line-width:2;line-opacity:0.7;} #af_fibrephase[live=false]{line-color: #D6301D;} #af_fibrephase[live=true]{line-color: #FF9900;}',
			interactivity: ['cartodb_id','phase_name','operator','owner','iso2','orgname']
  		});

        var event = function(e){
              $('#tool-tip').css({
                 left:  e.pageX,
                 top:   e.pageY
              });
          }; 

        // vis.addOverlay({
        //   type: 'tooltip',
        //   position : 'top|center',
        //   template : '<p>{{address}}</p>'
        // });                      

        // hide sublayers for Internet Speed In africa
        var num_sublayers = layer.getSubLayerCount();
        for (var i = 1; i < num_sublayers; i++) { 
          //console.log('sublayers: ', layer.getSubLayer(i)); 
          layer.getSubLayer(i).setInteraction(true);          
          layer.getSubLayer(i).infowindow.set('template', $('#infowindow_template').html())
            .on('error', function(err){
              console.log('infowindow error: ', err);
            });
          
          layer.getSubLayer(i).on('featureOver', function(e,pos,latlng,data){
            $('#tool-tip').html('<p>'  + data.address + '</p>');
            $(document).bind('mousemove', event);
            $('#tool-tip').show();
          });

          layer.getSubLayer(i).on('featureOut', function(e,pos,latlng,data){
           //Make the tooltip go away when off the zone
            $('#tool-tip').hide();
            $(document).unbind('mousemove', event, false);
          });

          layer.getSubLayer(i).hide();

        }

      });//.addTo(el.map);    
  };

  // change the cartoCSS of a layer
  var changeCartoCSS = function(layer, css) {
    layer.setCartoCSS(css);
  };

  // change SQL query of a layer
  var changeSQL = function(layer, sql) {
    layer.setSQL(sql);
  }

  // corresponding cartoCSS changes to layer Link with buttons
  
  // Documentation : https://carto.com/docs/tutorials/toggle_map_view/
  var VariousInternetSpeedActions = {
    ais1 : function() {
      changeCartoCSS(el.VariousInternetSpeed, el.styles.ais1);
      changeSQL(el.VariousInternetSpeed, el.sql.all);
      return true;
    },
    ais2 : function() {
      changeCartoCSS(el.VariousInternetSpeed, el.styles.ais2);
      changeSQL(el.VariousInternetSpeed, el.sql.all);
      return true;
    },
    ais3 : function() {
      changeCartoCSS(el.VariousInternetSpeed, el.styles.ais3);
      changeSQL(el.VariousInternetSpeed, el.sql.all);
      return true;
    },
    ais4 : function() {
      changeCartoCSS(el.VariousInternetSpeed, el.styles.ais4);
      changeSQL(el.VariousInternetSpeed, el.sql.ais4);
      return true;
    }
  };

  // add tax lot layer button event listeners
  var initButtons = function() {
    $('.button').click(function() {
      $('.button').removeClass('selected');
      $(this).addClass('selected');
      VariousInternetSpeedActions[$(this).attr('id')]();
    });    
  }

  // change layer sql selection based on check box boolean
  var initCheckboxesTwo = function() {
    // checkboxes for various layer
    var checkboxDOB = $('input.dob:checkbox'),
          $ipx = $('#ipx'),
          $sof = $('#sof'),
          $tof = $('#tof');

    // toggle Internet Provider
    $ipx.change(function(){
      if ($ipx.is(':checked')){
        el.InternetProvider.show();
        el.InternetProvider.setInteraction(true);
        el.InternetProvider.setInteractivity('country');
      } else {
        el.InternetProvider.hide();
      };
    });

    // toggle Submarine Optical Fiber (sof)
    $sof.change(function(){
      if ($sof.is(':checked')){
        el.SubmarineOpticalFiber.show();										// Set Interactivity : show info 
		//e1.setInteractivity('cartodb_id','name');		   
        el.SubmarineOpticalFiber.setInteraction(true);
		el.SubmarineOpticalFiber.setInteractivity('cartodb_id, capacity_g');		
      } else {
        el.SubmarineOpticalFiber.hide();
      };
    });    

    // toggle Terrestrial Optical Fiber (tof) 
    $tof.change(function(){
      if ($tof.is(':checked')){
        el.TerrestrialOpticalFibre.show();
        el.TerrestrialOpticalFibre.setInteraction(true);
        el.TerrestrialOpticalFibre.setInteractivity('cartodb_id,phase_name,operator,owner,iso2,orgname'); 
      } else {
        el.TerrestrialOpticalFibre.hide();
      };
    });        
  }

  // get it going!
  var init = function() {
    initMap();
    initButtons();
    initCheckboxesTwo();  
  }

  // only return init() and the stuff in the el object
  return {
    init : init,
    el : el
  }

})(window, document, jQuery, _);

// call app.map.init() once the dom is loaded
window.addEventListener('DOMContentLoaded', function(){
  app.map.init();
 // timerangeUI();
});