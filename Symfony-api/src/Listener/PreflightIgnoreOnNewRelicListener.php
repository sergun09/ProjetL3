<?php

namespace App\Listener;

use Symfony\Component\HttpKernel\Event\FilterResponseEvent;

class PreflightIgnoreOnNewRelicListener
{
    public function onKernelResponse(FilterResponseEvent $p)
    {
        if (!extension_loaded('newrelic')) {
            return;
        }

        if ('OPTIONS' === $event->getRequest()->getMethod()) {
            newrelic_ignore_transaction();
        }
    }
}
