// JSON array to improve performance for figures
var figures = []

function getResources() {
        $.getJSON('example/resources.json', function(data){
                        // Output the jobMetaData
                        $("#info").append('<strong>Beam:</strong> ' + data.jobMetaData.Beam + '</br>');
                        $("#info").append('<strong>Process:</strong> ' + data.jobMetaData.Process + '</br>');
                        $("#info").append('<strong>Energy:</strong> ' + data.jobMetaData.Energy + '</br>');
                        $("#info").append('<strong>Cuts:</strong> ' + data.jobMetaData.Cuts + '</br>');
                        $("#info").append('<strong>Generator:</strong> ' + data.jobMetaData.Generator + '</br>');
                        $("#info").append('<strong>Version:</strong> ' + data.jobMetaData.Version + '</br>');
                        $("#info").append('<strong>Tune:</strong> ' + data.jobMetaData.Tune + '</br>');
                        $("#info").append('<strong>Events:</strong> ' + data.jobMetaData.Events + '</br>');

                        // Retrieve histograms and append them to the figures
                        // array
                        $.each(data.sprites.histograms, function(index, histogram){
                                figures.push({'image': "example" + histogram});
                                });
                        return figures;
                        });
}

function createGallery() {
        // Activate the Galleria plugin
        Galleria.loadTheme('js/galleria/themes/classic/galleria.classic.min.js');
        $("#figures").galleria({
                        width: 520,
                        height: 440,
                        dataSource: figures,
                        preload: "all",
                        queue: false,
                        imagePosition: "center",
                        lightbox: true,
                        thumbnails: "numbers",
                        showCounter: false,
                        });
        // Grab the Gallery instance:
        var gallery = Galleria.get(0);
        // Set key-bindings
        gallery.attachKeyboard({
                        left: gallery.prev,
                        right: gallery.next,
                        up: gallery.openLightbox,
                        });   
}

getResources();
createGallery();
