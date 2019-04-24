//Un ejemplo de plugin que crea un control.
// Al hacer clic sobre el control se añade un marcador al mapa.

L.Control.Mappinggis =  L.Control.extend({

  options: {
    position: 'topleft'
  },

  initialize: function(options) {
    // Combina las opciones predeterminadas del complemento de control
    // con las que se pasaron como parámetro
    L.Util.setOptions(this, options);  
  },
  //Leaflet llama a la función onAdd cuando el control is añadido al mapa.
  onAdd: function (map) {
    //Creamos un nuevo elemento del DOM
    var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
    //Asignamos estilos al control
    container.style.backgroundColor = 'grey';  
    container.style.backgroundImage = "url(mappinggis.png)";   
    container.style.backgroundSize = "30px 30px";
    container.style.width = '30px';
    container.style.height = '30px';
    //Creamos un icono en la posición de mappingGIS
    var LeafIcon = L.Icon.extend({
    options: {
      iconSize:     [30, 30],
      iconAnchor:   [15, 30],
      popupAnchor:  [0, -30]
      }
    });
    var mappinggisIcon = new LeafIcon({iconUrl: 'mappinggis.png'});
    var marker = new L.marker([41.6526, -4.6975], {icon: mappinggisIcon}).bindPopup("MappingGIS");
    //Creamos un evento que inserta el icono de mappinggis al hacer clic
    //Con un nuevo clic se elimina el marcador de la vista del mapa
    container.onclick = function(){
    //Conocemos si el marcador está añadido al mapa o no mediante el método hasLayer
    //map.hasLayer(marker) devuelve true o false
        switch(map.hasLayer(marker)) {
            case false:
              marker.addTo(map);
               break;
            case true:
                map.removeLayer(marker);
              break;
          }
      } 
    //La función onAdd debe devolver el elemento DOM que contiene
    // el plugin del control.Leaflet agrega este elemento al mapa.
     return container;
  },
  onRemove: function(map) {
  		   
	}	
});


L.control.mappinggis = function(options) {
    return new L.Control.Mappinggis(options);
}