angular.module('starter.controllers', [])

.controller('PokemonCtrl', function($scope, Pokemon) {

  $scope.pokemonList = [];


  //$scope.pokemonList = Pokemon.getFeed('http://pokeapi.co/api/v2/pokemon?offset=760');
  Pokemon.getFeed().then(
    function(res) {
      console.log(res);
      $scope.pokemonList = res;
    }
  );
})

.controller('PokemonDetailCtrl', function($scope, $stateParams, Pokemon) {
  console.log($stateParams.pokemonId);
  Pokemon.get($stateParams.pokemonId)
    .then(function(res) {
      $scope.pokemon = res;
    });

  $scope.doBrag = function() {
    window.open('http://www.reddit.com/r/shinypokemon', '_system', 'location=yes');
  };
})

.controller('SettingsCtrl', function($scope, $ionicPlatform, $cordovaCamera) {
  $scope.settings = {
    enableFriends: true
  };

  $scope.cameraButtonLabel = 'take picture';
  $scope.imageSrc          = undefined;

  $scope.takePicture = function() {
    var options = {
      quality            : 50,
      destinationType    : Camera.DestinationType.DATA_URL,
      sourceType         : Camera.PictureSourceType.CAMERA,
      allowEdit          : false,
      encodingType       : Camera.EncodingType.JPEG,
      targetWidth        : 300,
      targetHeight       : 300,
      popoverOptions     : CameraPopoverOptions,
      saveToPhotoAlbum   : false,
      correctOrientation : true
    };

    $cordovaCamera.getPicture(options).then(
      function(imageData) {
        $scope.imageSrc = 'data:image/jpeg;base64,' + imageData;     
      }, 
      function(err) {
        console.log('Error Encountered');
      }
    );
  };
});
