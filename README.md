# Yodel
Distributed twitter clone built on webtorrent.

## How it's going to work

### Yodel and Dittos
1. Generate a public and private key.
2. Someone who wants to 'yodel' (now known as the song) should seed public key
    in a JSON file, with a bio and handle. This will be referred to as the
    "perch file".
3. Distribute the perch file hash to people, who will torrent and seed this file.
  * Those seeding the perch are dittos, this is similar to following someone.
4. When the perch yodeler to yodel to all their dittos, the yodeler should check
    its perch torrent to find dittos (peers), sign a song (message) with the
    private key, and send it to all connected dittos.
  * Dittos should validate the signed echo, and pass the echo to any other peers
      it knows of.

### Offline checking
Each user should keep songs from a those it's dittoing, and echo the songs upon
request, given a time to ditto back too. This way when a fellow dittoer comes
online, they can get songs from when they were offline.

### Hashtags
1. To generate a 'hashtag', seed an empty file named after the hashtag you want.
2. Find peers who are seeding that hashtag and send them songs, each validating
and echoing to peers of that hashtag.

### Searching
_Searching may not be possible with out a herculean effort and some computer
science I am not familiar with. Please contact me or submit a pull request if
you know an efficient way to do this._

-----------------------

## Roadmap
This Project is going to be made of several modules.

1. KeyManager
  * Generating, and storing (localstorage), public and private keys.
  * validating songs
  * signing songs
2. Ditto
  * This will keep track of perches, and how long it's been since a perch was
      heard from.
3. Hashtag
  * look up hashtags, finding hashtag peers, requesting and sending all hashtags
4. PeerConnection
  * connecting to peers, and sending songs.
5. UI Layer
  * Connect all the other modules

## Technologies
1. ReactJS - UI framework.
2. typescript - Typed version of javascript, with most of es6 available.
3. Karma - Unit test framework. (I am done trying to wrestle jest, IT NEVER WORKS)

## Installation
```bash
npm install
gulp dev
```
