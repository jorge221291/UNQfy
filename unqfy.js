
const picklejs = require('picklejs');

class Track{                                    // Clase Track
  constructor (anAlbum, unString, anInt, genresN){
    this.name=String;
    this.name=unString;
    this.album=anAlbum;
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
    this.tracks=[];
  }

  devolverTracks(){
    const listaDeTracks=[];
    for (let index = 0; index < this.tracks.length; index++) {
      const unaCancion = this.tracks[index];
      listaDeTracks.push(unaCancion);
    }return listaDeTracks;
  }
}

class Artist{                                   // Clase Artist
  constructor (aString, aCountry){
    this.name=aString;
    this.country=aCountry;
    this.albums=[];
  }

  devolverAlbums(){
    const listaDeAlbums=[];
    for (let index = 0; index < this.albums.length; index++) {
      const unAlbum = this.albums[index];
      listaDeAlbums.push(unAlbum);
    }return listaDeAlbums;
  }
}

class Playlist{                                 //Clase Playlist
  constructor (aString, genresN, time, listaDeTracks){
    this.name=aString;
    this.genresTotal=genresN;
    this.totalDuration=time;
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
    this.artists=[];
    this.playlists=[];
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
    let artista;
    for (let index = 0; index < listaDeArtistas.length; index++) {
      const unArtista = listaDeArtistas[index];
      if (name===unArtista.name){
        artista=unArtista;
      }
    }return artista;
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
    let listaDeAlbumsARetornar=[];
    for (let index = 0; index < listaDeArtistas.length; index++) {
      const unArtista = listaDeArtistas[index];
      listaDeAlbumsARetornar=listaDeAlbumsARetornar.concat(unArtista.devolverAlbums());
    }return listaDeAlbumsARetornar;
  }

  addTrack(albumName, {name:trackName, duration:trackDuraction, genres:trackGenres}) { //  Agrega una cancion a la lista de canciones del sistema
    const album= this.getAlbumByName(albumName);
    const cancionNueva=new Track (album, trackName, trackDuraction, trackGenres);
    if (album===undefined){
      console.log('album inexistente');
    }else{
      if (!(album.tracks.includes(this.getTrackByName(cancionNueva.name)))){
        album.tracks.push(cancionNueva);
      }else{
        console.log('No es posible agregar el track '+ '"'+cancionNueva.name+'" ya que se encuentra repetido');
      }
    }
  }

  getTrackByName(name) {        //Se le pasa el nombre de una canción y devuelve el objeto Track que corresponda
    const listaDeTracks=this.conseguirListaDeTracks();
    for (let index = 0; index < listaDeTracks.length; index++) {
      const cancion = listaDeTracks[index];
      if(name===cancion.name){
        return cancion;
      }
    }
  }

  conseguirListaDeTracks(){
    let listaDeTracks=[];
    const listaDeAlbumes= this.conseguirListaDeAlbums();
    for (let index = 0; index < listaDeAlbumes.length; index++) {
      const unAlbum = listaDeAlbumes[index];
      listaDeTracks=listaDeTracks.concat(unAlbum.devolverTracks());
    }return listaDeTracks;
  }

  getTracksMatchingGenres(genres) {
    const cumplenGeneros= [];    
    const listaDeTracks= this.conseguirListaDeTracks();                           //Recorre la lista de generos 
    for (let index = 0; index < genres.length; index++) {                         //recibida por parametro y le pregunta
      const genero = genres[index];                                               //a cada Track si su lista de generos
      for (let index = 0; index < listaDeTracks.length; index++) {                //incluye al genero buscado y si no se
        const cancion = listaDeTracks[index];                                     //habia pusheado antes (para evitar 
        if (cancion.cumpleGenero(genero)&&!(cumplenGeneros.includes(cancion))){   //repetidos) se pushea.
          cumplenGeneros.push(cancion);
        }
      }
    }
    return cumplenGeneros;
  }

  getTracksMatchingArtist(unArtista) {   //Le paso un artista y devuelve la lista de canciones asociadas a el
    const albums=unArtista.devolverAlbums();
    let tracks=[];
    for (let index = 0; index < albums.length; index++) {
      const unAlbum = albums[index];
      tracks=tracks.concat(unAlbum.devolverTracks());
    }return tracks;
  }

  /* addPlaylist(name, genresToInclude, maxDuration) {
    /* El objeto playlist creado debe soportar (al menos):
      * una propiedad name (string)
      * un metodo duration() que retorne la duración de la playlist.
      * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist
    
    this.playlists.push(new Playlist(name, genresToInclude, maxDuration, this.tracks));
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
s.addAlbum('Evanescence', {name:'The open door', year:2006});
s.addAlbum('Avril Lavigne', {name:'The best damn thing'});

s.addTrack('Fallen', {name:'Bring me to life', duration:236, genres:['Rock']});
s.addTrack('Fallen', {name:'Bring me to life', duration:236, genres:['Rock']});
s.addTrack('The open door', {name:'Bring me to life', duration:236, genres:['Rock']});
s.addTrack('Let go', {name:'Complicated', duration:244, genres:['Rock', 'pop']});

s.addAlbum('Avril Lavigne', {name:'Let go'});

s.addTrack('Let go', {name:'Complicated', duration:244, genres:['Rock', 'pop']});

for (let index = 0; index < s.artists.length; index++) {
  const element = s.artists[index];
  console.log(element);
  for (let index = 0; index < element.albums.length; index++) {
    const element2 = element.albums[index];
    console.log(element2);
    
  }
}

const cancionesDeRock= s.getTracksMatchingGenres(['Rock'])
for (let index = 0; index < cancionesDeRock.length; index++) {
  const element = cancionesDeRock[index];
  console.log(element);
}
