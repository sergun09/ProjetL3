<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\EmpruntRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: EmpruntRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['read:collection']],
    denormalizationContext: ['groups' => ['write']], 
    itemOperations: [
        'put' ,
        'delete',
        'get' => [
            'normalization_context' => ['groups'=> ['read:collection', 'read:item', 'read:emprunt']]
        ]
    ]
        ),ApiFilter(SearchFilter::class, properties: ['adherent' => 'exact'])
        ]
class Emprunt
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['read:collection', 'read:item', 'write'])]
    private $id;

    #[ORM\Column(type: 'datetime')]
    #[Groups(['read:collection', 'read:item', 'write'])]
    private $datedebut;

    #[ORM\Column(type: 'datetime')]
    #[Groups(['read:collection', 'read:item', 'write'])]
    private $datefin;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['read:collection', 'read:item', 'write'])]
    private $motif;

    #[ORM\ManyToOne(targetEntity: Materiel::class, inversedBy: 'emprunts')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['read:collection', 'read:item', 'write'])]
    private $materiel;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'emprunts')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['write'])]
    private $adherent;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDatedebut(): ?\DateTimeInterface
    {
        return $this->datedebut;
    }

    public function setDatedebut(\DateTimeInterface $datedebut): self
    {
        $this->datedebut = $datedebut;

        return $this;
    }

    public function getDatefin(): ?\DateTimeInterface
    {
        return $this->datefin;
    }

    public function setDatefin(\DateTimeInterface $datefin): self
    {
        $this->datefin = $datefin;

        return $this;
    }

    public function getMotif(): ?string
    {
        return $this->motif;
    }

    public function setMotif(string $motif): self
    {
        $this->motif = $motif;

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

    public function getAdherent(): ?User
    {
        return $this->adherent;
    }

    public function setAdherent(?User $adherent): self
    {
        $this->adherent = $adherent;

        return $this;
    }
}
