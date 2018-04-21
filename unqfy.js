
const picklejs = require('picklejs');

class Track{                                    // Clase Track
  constructor (anAlbum, unString, anInt, genresN){
    this.name=String;
    this.name=unString;
    this.album=anAlbum;
    this.genres= new Array(String);
    this.genres=genresN;
    this.duration=anInt;
  }

  cumpleGenero(genro){
    return (this.genres.includes(genro));
  }

}

class Album{                                    // Clase Album
  constructor (anArtist, aName, aYear){
    this.artistsOfAlbum= anArtist;
    this.name=aName;
    this.year=aYear;

  }
}

class Artist{                                   // Clase Artist
  constructor (aString, aCountry){
    this.name=aString;
    this.country=aCountry;
    this.albums=new Array(Album);
    this.albums=[];
  }

  devolverAlbumsDelArtista(){
    return this.albums;
  }
}

class Playlist{                                 //Clase Playlist
  constructor (aString, genresN, time, listaDeTracks){
    this.name=aString;
    this.genresTotal=new Array(String);
    this.genresTotal=genresN;
    this.totalDuration=time;
    this.totalTracks=new Array(Track);
    this.totalTracks=listaDeTracks;
  }

  duration(){
    return this.totalDuration;
  }

  hasTrack(aTrack){
    return (this.totalTracks.includes(aTrack));
  }
}

class UNQfy {                                   // Clase UNQfy
  constructor(){
    this.artists= new Array(Artist);
    this.artists=[];
    this.playlists= new Array(Playlist);
  }

  addArtist(anArtist) {              // Agrega un artista a la lista de artistas de la clase UNQfy
    const artistaNuevo= new Artist(anArtist.name, anArtist.country);
    if (this.getArtistByName(artistaNuevo.name)===undefined){
      this.artists.push(artistaNuevo);
    }else{
        console.log('No es posible agregar el artista '+ '"'+artistaNuevo.name+'" ya que se encuentra repetido');
    }
  }

  getArtistByName(name) {       //Se le pasa el nombre de un artista y devuelve el objeto Artist asociado a el
    const listaDeArtistas=this.artists;
    for (let index = 0; index < listaDeArtistas.length; index++) {
      const unArtista = listaDeArtistas[index];
      if (name===unArtista.name){
        return unArtista;
      }
    }
  }

  addAlbum(artistName, anAlbum) {  // Agrega un album a la lista de albums del sistema, en caso de que el artista dueño del album no exista tambien lo cre
    const artista=this.getArtistByName(artistName);
    const albumNuevo= new Album(artista, anAlbum.name, anAlbum.year);
    if (this.getAlbumByName(albumNuevo.name)===undefined){
      artista.albums.push(albumNuevo);
    }else{
      console.log('No es posible agregar el album '+ '"'+albumNuevo.name+'" ya que se encuentra repetido');
    }
  }

  getAlbumByName(name) {      //Se le pasa el nombre de un album y devuelve el objeto Album asociado
    const listaDeAlbumes=this.conseguirListaDeAlbums();
    for (let index = 0; index < listaDeAlbumes.length; index++) {
      const album = listaDeAlbumes[index];
      if(name===album.name){
        return album;
      }
    }
  }

  conseguirListaDeAlbums(){
    const listaDeArtistas=this.artists;
    const listaDeAlbumsARetornar=[];
    for (let index = 0; index < listaDeArtistas.length; index++) {
      const unArtista = listaDeArtistas[index];
      for (let index = 0; index < unArtista.albums.length; index++) {
        const unAlbum = unArtista.albums[index];
        listaDeAlbumsARetornar.push(unAlbum);
      }
    }return listaDeAlbumsARetornar;
  }

  /* addTrack(albumName, trackName, trackDuraction, trackGenres) { //  Agrega una cancion a la lista de canciones del sistema
    /* El objeto track creado debe soportar (al menos) las propiedades:
         name (string),
         duration (number),
         genres (lista de strings)
    
    this.tracks.push(new Track (albumName, trackName, trackDuraction, trackGenres));
  }

  addPlaylist(name, genresToInclude, maxDuration) {
    /* El objeto playlist creado debe soportar (al menos):
      * una propiedad name (string)
      * un metodo duration() que retorne la duración de la playlist.
      * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist
    
    this.playlists.push(new Playlist(name, genresToInclude, maxDuration, this.tracks));
  }

  getTracksMatchingGenres(genres) {
    // Debe retornar todos los tracks que contengan alguno de los generos en el parametro genres
    const cumplenGeneros= [];                                                     //Recorre la lista de generos 
    for (let index = 0; index < genres.length; index++) {                         //recibida por parametro y le pregunta
      const genero = genres[index];                                               //a cada Track si su lista de generos
      for (let index = 0; index < this.tracks.length; index++) {                  //incluye al genero buscado y si no se
        const cancion = this.tracks[index];                                       //habia pusheado antes (para evitar 
        if (cancion.cumpleGenero(genero)&&!(cumplenGeneros.includes(cancion))){//repetidos) se pushea.
          cumplenGeneros.push(cancion);
        }
      }
    }
    return cumplenGeneros;
  }      

  getAlbumesDeUnArtista(artist){    //Devuelve una lista de albumes que interpreta un artista
    const listaDeAlbumes=this.albums;
    const albumesResultantes=[];
    for (let index = 0; index < listaDeAlbumes.length; index++) {
      const album = listaDeAlbumes[index];
      if(artist.name===album.artistsOfAlbum){
        albumesResultantes.push(album);
      }
    }
    return albumesResultantes;
  }

  getTracksMatchingArtist(artistName) {   //Le paso un artista y devuelve la lista de canciones asociadas a el
    const listaDeCanciones=this.tracks;
    const albumesResultantes=this.getAlbumesDeUnArtista(artistName);          //Albumes que son del artista
    const cancionesResultantes=[];                                     //Recorro la lista de canciones y los albums que 
    for (let index = 0; index < listaDeCanciones.length; index++) {    //contienen al artista para poder de esta manera 
      const cancion = listaDeCanciones[index];                         //preguntar si el nombre del album del artista
      for (let index = 0; index < albumesResultantes.length; index++) {//es igual a el album que lo contiene.
        const albumQueContieneAlArtista = albumesResultantes[index];   //Estoy comparando Album.name con Track.album,
        if (albumQueContieneAlArtista.name===cancion.album){           //entonces si la cancion pertenece al album que 
          cancionesResultantes.push(cancion);                          //interpreta el artista buscado se pushea.
        }
      }
    }
    return cancionesResultantes;
  }

  getTrackByName(name) {        //Se le pasa el nombre de una canción y devuelve el objeto Track que corresponda
    const listaDeTracks=this.tracks;
    for (let index = 0; index < listaDeTracks.length; index++) {
      const cancion = listaDeTracks[index];
      if(name===cancion.name){
        return cancion;
      }
    }
  }

  getPlaylistByName(name) {     //Se le pasa el nombre de una Playlist y devuelve el objeto Playlist asociado
    const listaDePlaylists=this.playlists;
    for (let index = 0; index < listaDePlaylists.length; index++) {
      const playlist = listaDePlaylists[index];
      if(name===playlist.name){
        return playlist;
      }
    }
  }*/

  save(filename = 'unqfy.json') {
    new picklejs.FileSerializer().serialize(filename, this);
  }

  static load(filename = 'unqfy.json') {
    const fs = new picklejs.FileSerializer();
    // TODO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy];
    fs.registerClasses(...classes);
    return fs.load(filename);
  }
}

// TODO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy
};

// Pruebas
const s= new UNQfy();
s.addArtist({name:'Evanescence', country:'USA'});
s.addArtist({name:'Evanescence', country:'USA'});
s.addArtist({name:'Avril Lavigne', country:'USA'});
s.addArtist({name:'Evanescence', country:'USA'});
s.addAlbum('Avril Lavigne', {name:'The best damn thing'});
s.addAlbum('Evanescence', {name:'Fallen', year:2003});
s.addAlbum('Avril Lavigne', {name:'The best damn thing'});


for (let index = 0; index < s.artists.length; index++) {
  const element = s.artists[index];
  console.log(element);
}