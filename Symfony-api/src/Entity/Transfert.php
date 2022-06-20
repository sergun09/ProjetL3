<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\TransfertRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TransfertRepository::class)]
#[ApiResource()]
class Transfert
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'transfertsEmetteur')]
    #[ORM\JoinColumn(nullable: false)]
    private $emetteur;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'transfertRecepteur')]
    #[ORM\JoinColumn(nullable: false)]
    private $recepteur;

    #[ORM\Column(type: 'boolean')]
    private $etat;

    #[ORM\ManyToOne(targetEntity: Materiel::class, inversedBy: 'transferts')]
    #[ORM\JoinColumn(nullable: false)]
    private $materiel;

    public function __construct()
    {
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmetteur(): ?User
    {
        return $this->emetteur;
    }

    public function setEmetteur(?User $emetteur): self
    {
        $this->emetteur = $emetteur;

        return $this;
    }

    public function getRecepteur(): ?User
    {
        return $this->recepteur;
    }

    public function setRecepteur(?User $recepteur): self
    {
        $this->recepteur = $recepteur;

        return $this;
    }

    public function isEtat(): ?bool
    {
        return $this->etat;
    }

    public function setEtat(bool $etat): self
    {
        $this->etat = $etat;

        return $this;
    }

    public function getMateriel(): ?Materiel
    {
        return $this->materiel;
    }

    public function setMateriel(?Materiel $materiel): self
    {
        $this->materiel = $materiel;

        return $this;
    }
}
