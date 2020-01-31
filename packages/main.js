function onBeforeBuildFinish (options, callback) {
	
    let buildResults = options.buildResults;

    // get path of textures auto generated by auto atlas
    Editor.assetdb.queryAssets('db://assets/Auto Atlas/**/*', 'sprite-frame', (err, assetInfos) => {
        let textures = _getTextureFromSpriteFrames(buildResults, assetInfos);
        for (let i = 0; i < textures.length; ++i) {
            let path = buildResults.getNativeAssetPath(textures[i]);
            Editor.log(`Texture of "db://assets/Auto Atlas/AutoAtlas": ${path}`);
        }
    });

    // get texture path of plist atlas
    Editor.assetdb.queryAssets('db://assets/Packed Texture/atlas.png', 'texture', (err, assetInfos) => {
        for (let i = 0; i < assetInfos.length; ++i) {
            let tex = assetInfos[i].uuid;
            if (buildResults.containsAsset(tex)) {
                let path = buildResults.getNativeAssetPath(tex);
                Editor.log(`Texture of "${assetInfos[i].url}": ${path}`);
            }
        }
    });

    // get common texture path
    Editor.assetdb.queryAssets('db://assets/Normal Texture/**/*', 'texture', (err, assetInfos) => {
        for (let i = 0; i < assetInfos.length; ++i) {
            let tex = assetInfos[i].uuid;
            if (buildResults.containsAsset(tex)) {
                let path = buildResults.getNativeAssetPath(tex);
                Editor.log(`Texture of "${assetInfos[i].url}": ${path}`);
            }
        }
    });

    // get all textures in build
    let textures = [];
    let assets = buildResults.getAssetUuids();
    let textureType = cc.js._getClassId(cc.Texture2D);
    for (let i = 0; i < assets.length; ++i) {
        let asset = assets[i];
        if (buildResults.getAssetType(asset) === textureType) {
            textures.push(buildResults.getNativeAssetPath(asset));
        }
    }
    Editor.log(`All textures in build: ${textures}`);
	*/
	
	

    callback();
}

function _getTextureFromSpriteFrames (buildResults, assetInfos) {
    let textures = {};
    for (let i = 0; i < assetInfos.length; ++i) {
        let info = assetInfos[i];
        if (buildResults.containsAsset(info.uuid)) {
            let depends = buildResults.getDependencies(info.uuid);
            if (depends.length > 0) {
                // sprite frame should have only one texture
                textures[depends[0]] = true;
            }
        }
    }
    return Object.keys(textures);
}

module.exports = {
    load () {
        Editor.Builder.on('before-change-files', onBeforeBuildFinish);
		Editor.log(`exports.load`);
    },

    unload () {
        Editor.Builder.removeListener('before-change-files', onBeforeBuildFinish);
		Editor.log(`exports.unload`);
    }
};