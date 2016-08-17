/**** CartoCSS for styling data ****/
var app = app || {};

app.mapStyles = (function(){
  return {
  // default style, Show Internet Speed In Africa from Akamai
  ais1 : '#internetspeedinafricadata {' +
                                'polygon-fill: #F2D2D3;' +
                                'polygon-opacity: 0.8;' +
                                'line-color: #000;' +
                                'line-width: 0.5;' +
                                'line-opacity: 1;' +
                              '}' +
				          '#internetspeedinafricadata [ internet_speed_akamai <= 10240] { polygon-fill: #C1373C;}' +
                          '#internetspeedinafricadata [ internet_speed_akamai <= 8192] { polygon-fill: #CC4E52;} ' +
                          '#internetspeedinafricadata [ internet_speed_akamai <= 6144] { polygon-fill: #D4686C;}' +
                          '#internetspeedinafricadata [ internet_speed_akamai <= 4096] { polygon-fill: #DB8286;} ' +
                          '#internetspeedinafricadata [ internet_speed_akamai <= 2048] { polygon-fill: #E39D9F;} ' +
                          '#internetspeedinafricadata [ internet_speed_akamai <= 1024] { polygon-fill: #EBB7B9;} '+  
                          '#internetspeedinafricadata [ internet_speed_akamai <= 512] {  polygon-fill: #F2D2D3;}',

  // category style based on Internet Africa Users 
  ais2 : "#internetspeedinafricadata {" +
                             "polygon-fill: #F2D2D3;" +
                             "polygon-opacity: 0.8;" +
                             "line-color: #000;" +
                             "line-width: 0.5;" +
                             "line-opacity: 1;" +
                          "}" +                           
				          '#internetspeedinafricadata [ internet_speed_akamai <= 10240] { polygon-fill: #C1373C;}' +
                          '#internetspeedinafricadata [ internet_speed_akamai <= 8192] { polygon-fill: #CC4E52;} ' +
                          '#internetspeedinafricadata [ internet_speed_akamai <= 6144] { polygon-fill: #D4686C;}' +
                          '#internetspeedinafricadata [ internet_speed_akamai <= 4096] { polygon-fill: #DB8286;} ' +
                          '#internetspeedinafricadata [ internet_speed_akamai <= 2048] { polygon-fill: #E39D9F;} ' +
                          '#internetspeedinafricadata [ internet_speed_akamai <= 1024] { polygon-fill: #EBB7B9;} '+  
                          '#internetspeedinafricadata [ internet_speed_akamai <= 512] {  polygon-fill: #F2D2D3;}',

  // choropleth show Internet Speeed in Africa from IUT                          
  ais4 : "#internetspeedinafricadata {" +
                             "polygon-fill: #F2D2D3;" +
                             "polygon-opacity: 0.8;" +
                             "line-color: #000;" +
                             "line-width: 0.5;" +
                             "line-opacity: 1;" +
                          "}" +                           
                          '#internetspeedinafricadata [ internet_user <= 75] { polygon-fill: #C1373C;}' +
                          '#internetspeedinafricadata [ internet_user <= 50] { polygon-fill: #CC4E52;} ' +
                          '#internetspeedinafricadata [ internet_user <= 40] { polygon-fill: #D4686C;}' +
                          '#internetspeedinafricadata [ internet_user <= 30] { polygon-fill: #DB8286;} ' +
                          '#internetspeedinafricadata [ internet_user <= 20] { polygon-fill: #E39D9F;} ' +
                          '#internetspeedinafricadata [ internet_user <= 10] { polygon-fill: #EBB7B9;} '+  
                          '#internetspeedinafricadata [ internet_user <= 5] {  polygon-fill: #F2D2D3;}',
       
  //  choropleth show Internet Speeed in Africa : Number of Internet User 
  ais3 :  "#internetspeedinafricadata {" +
                             "polygon-fill: #FFFFB2;" +
                             "polygon-opacity: 0.8;" +
                             "line-color: #000;" +
                             "line-width: 0.2;" +
                             "line-opacity: 0.5;" +
                          "}" +                           
                          '#internetspeedinafricadata [ internet_user <= 75] { polygon-fill: #8A4E8A;}' +
                          '#internetspeedinafricadata [ internet_user <= 50] { polygon-fill: #A05AA0;} ' +
                          '#internetspeedinafricadata [ internet_user <= 40] { polygon-fill: #B379B3;}' +
                          '#internetspeedinafricadata [ internet_user <= 30] { polygon-fill: #C08FC0;} ' +
                          '#internetspeedinafricadata [ internet_user <= 20] { polygon-fill: #CCA5CC;} ' +
                          '#internetspeedinafricadata [ internet_user <= 10] { polygon-fill: #D8BBD8;} '+  
                          '#internetspeedinafricadata [ internet_user <= 5] {  polygon-fill: #F1E6F1;}',  				  
  };
})();
