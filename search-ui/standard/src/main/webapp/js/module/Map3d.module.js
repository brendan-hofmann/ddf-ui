/**
 * Copyright (c) Codice Foundation
 *
 * This is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser General Public License as published by the Free Software Foundation, either
 * version 3 of the License, or any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Lesser General Public License for more details. A copy of the GNU Lesser General Public License is distributed along with this program and can be found at
 * <http://www.gnu.org/licenses/lgpl.html>.
 *
 **/
/* global define, require */
define(['application',
        'cometdinit',
        'marionette',
        'maptype'
    ],
    function(Application, Cometd, Marionette, maptype) {

        Application.App.module('Map3dModule', function(Map3dModule) {

            if (maptype.is3d()) {
                var Map3d = Marionette.Layout.extend({
                    template: 'map',
                    className: 'height-full',
                    regions: {
                        mapDrawingPopup: '#mapDrawingPopup'
                    },
                    onShow: function() {
                        require(['js/controllers/geospatial.controller',
                            'js/widgets/draw.bbox',
                            'js/widgets/draw.circle'
                        ], function (GeoController, DrawBbox, DrawCircle) {

                            var geoController = new GeoController();

                            new DrawBbox.Controller({
                                scene: geoController.scene,
                                notificationEl: mapView.mapDrawingPopup.el
                            });

                            new DrawCircle.Controller({
                                scene: geoController.scene,
                                notificationEl: mapView.mapDrawingPopup.el
                            });
                        });
                    }
                });

                var mapView = new Map3d();

                var Controller = Marionette.Controller.extend({

                    initialize: function(options){
                        this.region = options.region;
                    },

                    show: function(){
                        this.region.show(mapView);
                    }

                });

                Map3dModule.addInitializer(function(){
                    Map3dModule.contentController = new Controller({
                        region: Application.App.mapRegion
                    });
                    Map3dModule.contentController.show();
                });
            }
        });

    });