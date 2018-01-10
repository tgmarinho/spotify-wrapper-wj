import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

import { search, searchAlbums, searchTracks, searchPlaylists, searchArtists } from '../src/main';
import { isContext } from 'vm';

describe('Spotify Wrapper', () => {

    describe('smoke tests', () => {
     
        it('should exists the search method', () => {
            expect(search).to.exist;
        });

        it('should exists the searchAlbums method', () => {
            expect(searchAlbums).to.exist;
        });

        it('should exists the searchArtists method', () => {
            expect(searchArtists).to.exist;
        });

        it('should exists the searchTracks method', () => {
            expect(searchTracks).to.exist;
        });

        it('should exists the searchPlaylists method', () => {
            expect(searchPlaylists).to.exist;
        });
    });

    describe('Generic Search', () => {

        let fetchedStub;

        beforeEach( () => {
            fetchedStub = sinon.stub(global, 'fetch');
        });

        afterEach( () => {
            fetchedStub.restore();
        });
       
        it('should call fetch function', () => {
            const artists = search();
            expect(fetchedStub).to.have.been.calledOnce;
        });

        it('should call fetch with the correct URL', () => {

            context('passing one type', () => {
                const artists = search('Incubus', 'artist');
                expect(fetchedStub).to.have.been
                    .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');
           
                const albums  = search('Incubus', 'album');
                expect(fetchedStub).to.have.been
                    .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');
            });

            context('passing more than one type', () => {
                const artistAndAlbums = search('Incubus',['artist', 'album']);
                expect(fetchedStub).to.have.been
                    .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album');
            });

        });
           

    });

});
