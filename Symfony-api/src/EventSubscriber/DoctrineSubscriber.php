<?php

namespace App\EventSubscriber;

use App\Entity\User;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;

class DoctrineSubscriber implements EventSubscriberInterface
{
    private $passwordInterface;

    public function __construct(UserPasswordHasherInterface $passwordInterface)
    {
        $this->passwordInterface = $passwordInterface;
    }
    public function onKernelView(ViewEvent $event): void
    {
        $entity = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($entity instanceof User && ($method == Request::METHOD_POST || $method == Request::METHOD_PATCH)) {
            $entity->setPassword($this->passwordInterface->hashPassword($entity, $entity->getPassword()));
        }
    }

    public static function getSubscribedEvents(): array
    {
        return [
            'kernel.view' => ['onKernelView', EventPriorities::PRE_WRITE]
        ];
    }
}
