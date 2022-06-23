<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\TransfertRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: TransfertRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['read:collection']],
    denormalizationContext: ['groups' => ['write']], 
    itemOperations: [
        'put' ,
        'delete',
        'patch',
        'get' => [
            'normalization_context' => ['groups'=> ['read:collection', 'read:item', 'read:transfert']]
        ]
    ]
        ),ApiFilter(SearchFilter::class, properties: ['emetteur' => 'exact', 'recepteur' => 'exact'])
        ]
class Transfert
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['read:collection', 'write', 'read:materiel'])]
    private $id;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'transfertsEmetteur')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read:collection', 'write', "read:item", 'read:materiel'])]
    private $emetteur;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'transfertRecepteur')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read:collection', 'write', "read:item", 'read:materiel'])]
    private $recepteur;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['read:collection', 'write', 'read:materiel'])]
    private $etat;

    #[ORM\ManyToOne(targetEntity: Materiel::class, inversedBy: 'transferts')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read:collection', 'write', "read:item"])]
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
