<?php

class BaseController {

    const VIEW_FOLDER_NAME = 'Views';
    const MODEL_FOLDER_NAME = 'Models';
    //  description:
    // + path name: folder.fileName
    // + lấy từ sau thư mục view
    protected function view($path, array $data=[]) {

        foreach($data as $key => $value) {
            $$key =$value;
        }
        $path= self::VIEW_FOLDER_NAME . '/' . str_replace('.', '/', $path) . '.php';
        return require($path);
        
    }

    protected function loadModel($modelPath) {
        require (self::MODEL_FOLDER_NAME . '/' . $modelPath . '.php');
    }

}
?>