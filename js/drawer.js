define([
    'adapt-contrib-core/js/adapt',
    './views/drawerView'
], function(Adapt, DrawerView) {

    require.config({
      map: {
        '*': {
          'core/js/drawer': 'adapt-contrib-drawer/js/drawer',
          'core/js/views/drawerView': 'adapt-contrib-drawer/js/views/drawerView',
          'adapt-contrib-core/js/drawer': 'adapt-contrib-notify/js/drawer',
          'adapt-contrib-core/js/views/drawerView': 'adapt-contrib-notify/js/views/drawerView'
        }
      }
    });

    var DrawerCollection = new Backbone.Collection();
    var Drawer = {};

    Drawer.addItem = function(drawerObject, eventCallback) {
        drawerObject.eventCallback = eventCallback;
        DrawerCollection.add(drawerObject);
    };

    Drawer.triggerCustomView = function(view, hasBackButton) {
        if (hasBackButton !== false) {
            hasBackButton = true;
        }
        Adapt.trigger('drawer:triggerCustomView', view, hasBackButton);
    };

    var init = function() {
        var drawerView = new DrawerView({collection: DrawerCollection});

        Adapt.on('app:languageChanged', function() {
            drawerView.remove();
            drawerView = new DrawerView({collection: DrawerCollection});
        });
    };

    Adapt.once('app:dataReady', function() {
        init();
    });

    Adapt.drawer = Drawer;

});
