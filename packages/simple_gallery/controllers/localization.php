<?php namespace Concrete\Package\SimpleGallery\Controller;

use Concrete\Core\Controller\Controller;
use Concrete\Core\Http\ResponseFactoryInterface;

defined('C5_EXECUTE') or die('Access Denied.');

class Localization extends Controller
{

    private function createJavascriptResponse($content) {

        $rf = $this->app->make(ResponseFactoryInterface::class);

        return $rf->create(
            $content,
            200,
            [
                'Content-Type' => 'application/javascript; charset=' . APP_CHARSET,
                'Content-Length' => strlen($content),
            ]
        );

    }

    public function view() {

        $sgi18n = array();
        $sgi18n['imageNotLoaded'] = t('%sThe image%s could not be loaded.', '<a href=\"%url%\">', '</a>');
        $sgi18n['close']          = t('Close (Esc)');
        $sgi18n['loading']        = t('Loading...');
        $sgi18n['previous']       = t('Previous (Left arrow key)');
        $sgi18n['next']           = t('Next (Right arrow key)');
        $sgi18n['counter']        = t('%curr% of %total%');

        $content = '';

        $content .= 'var sgi18n = ';

        $content .= json_encode($sgi18n);

        $content .=  ';';

        return $this->createJavascriptResponse($content);

    }
    
}