(function() {
    const FLICKR_PHOTO_URL = 'https://api.flickr.com/services/rest/' +
        '?method=flickr.people.getPublicPhotos' +
        '&api_key=4ba1675febe39451e90b210a634230e0' +
        '&user_id=129886391@N02' +
        '&per_page=24' +
        '&page=1' +
        '&format=json' +
        '&nojsoncallback=1';
    const FLICKR_ALBUM_URL = 'https://api.flickr.com/services/rest/' +
        '?method=flickr.photosets.getList' +
        '&api_key=4ba1675febe39451e90b210a634230e0' +
        '&user_id=129886391@N02' +
        '&per_page=6' +
        '&page=1' +
        '&format=json' +
        '&nojsoncallback=1';

    var flickrApp = angular.module('flickr-app', []);

    flickrApp.controller('flickr-ctrl', ['$scope', '$http', function($scope, $http) {
        $scope.currentPhotoView = 'Recent Albums';
        $scope.albumView = true;
        $scope.lastAlbumID = '';

        $http.get(FLICKR_ALBUM_URL).then(
            function(flickrAlbumList) {
                $scope.flickrAlbumList = flickrAlbumList.data.photosets;
                console.log(flickrAlbumList);
            },
            function(flickrAlbumListErr) {
                console.log(flickrAlbumListErr);
            }
        );

        $scope.viewAlbumSet = function($event, albumID) {
            $event.preventDefault();

            var flickrAlbumPhotos = 'https://api.flickr.com/services/rest/' +
                '?method=flickr.photosets.getPhotos' +
                '&api_key=4ba1675febe39451e90b210a634230e0' +
                '&user_id=129886391@N02' +
                '&photoset_id=' + albumID +
                '&per_page=16' +
                '&page=1' +
                '&format=json' +
                '&nojsoncallback=1';

            if (albumID !== $scope.lastAlbumID) {
                $http.get(flickrAlbumPhotos).then(
                    function(flickrPhotoset) {
                        console.log(flickrPhotoset);
                        $scope.flickrPhotoset = flickrPhotoset.data.photoset;
                        $scope.lastAlbumID = albumID;
                        $scope.albumView = false;
                        $scope.currentPhotoView = flickrPhotoset.data.photoset.title;
                        $scope.lastAlbumTitle = flickrPhotoset.data.photoset.title;
                    },
                    function(flickrPhotosetErr) {
                        console.log(flickrPhotosetErr);
                    }
                );
            }
            else {
                $scope.albumView = false;
                $scope.currentPhotoView = $scope.lastAlbumTitle;
            }
        }
        $scope.viewAlbumList = function($event) {
            $event.preventDefault();
            $scope.albumView = true;
            $scope.currentPhotoView = 'Recent Albums';
        }
        $scope.viewFlickrPhoto = function($event, photoIndex) {
            $event.preventDefault();
            var lightbox = document.getElementById('lightbox');

            if (lightbox !== null) {
                var lightboxImg = document.getElementById('lightbox-image');
                var photo = $scope.flickrPhotoset.photo[photoIndex];
                var url = 'https://farm' + photo.farm + '.staticflickr.com/' +
                    photo.server + '/' + photo.id + '_' + photo.secret + '_b.jpg'

                lightboxImg.style.backgroundImage = "url('" + url + "')";
                $scope.pictureTitle = photo.title;
                $scope.photoID = photo.id;
                $scope.lightbox = true;
            }
            else {
                $scope.lightbox = false;
            }
        }
        $scope.closeLightbox = function() {
            $scope.lightbox = false;
        }
    }]);

    angular.bootstrap(document.getElementById('flickr-photos'), ['flickr-app']);
})();
