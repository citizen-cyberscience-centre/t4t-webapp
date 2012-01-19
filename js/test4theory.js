// 2011 Copyright Citizen Cyberscience Centre
//
// This file is part of t4t-webapp.
// 
// t4t-webapp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// t4t-webapp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with t4t-webapp.  If not, see <http://www.gnu.org/licenses/>.

// JSON array to improve performance for figures
var figures = [];

function getBoincData() {
        $.getJSON('boinc.json', function(data){
                        // Output the jobMetaData
                        $("#boinc").show();
                        $("#boinc").append('<strong>User:</strong> ' + data.boinc.BOINC_USERNAME + '</br>');
                        $("#boinc").append('<strong>User Total Credit:</strong> ' + data.boinc.BOINC_USER_TOTAL_CREDIT + '</br>');
                        $("#boinc").append('<strong>Host Total Credit:</strong> ' + data.boinc.BOINC_HOST_TOTAL_CREDIT + '</br>');

        });
}

function getResources() {
        $.getJSON('job/resources.json', function(data){
                        // Check if there are some images to show, otherwise, keep the waiting message
                        if (data.sprites.histograms.length != 0) {
                                $("#waiting").hide();
                                // Show the container and left sidebar
                                $("#with-js").show();
                                // Show the github footer
                                $("#github").show();
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
                                        figures.push({'image': "job" + histogram});
                                        });
                                // Enable all the divs
                                return figures;
                        }
                        });
}

function createGallery(w,h) {
        w = typeof(w) != 'undefined' ? w : "auto";
        h = typeof(h) != 'undefined' ? h : "auto";
        // Activate the Galleria plugin
        Galleria.loadTheme('js/galleria/themes/classic/galleria.classic.min.js');
        $("#figures").galleria({
                        width: w,
                        height: h,
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

// Show the waiting div when JS is enabled
function setWidth() {
        aspect_ratio = ($(window).width()/$(window).height());
        //w = (($(window).width() * 45) / 100);
        h = (($(window).height() * 70) / 100);

        // Figures width and height based on viewport
        $("#figures").css('width', h + 30);
        $("#figures").css('height', h);
        
        // Video tutorial width and height based on figures size 
        w = (($(window).width() * 35) / 100);
        h = w / 1.7;
        $("#video-container").css('width', w);
        $("#video-container").css('width', h);
        
        // Position for the video tutorial
        p = $(window).width() - w + (w/3);
        $("#video-container").css('left', p);

}
        setWidth();

if (Modernizr.video.webm) {
        $("#noscript").hide();
        $("#waiting").show();
        getBoincData();
        getResources();
        createGallery('auto','auto');
}


