<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\DysfonctionnementRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: DysfonctionnementRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['read:collection']],
    denormalizationContext: ['groups' => ['write']], 
    itemOperations: [
        'put' ,
        'delete',
        'patch',
        'get' => [
            'normalization_context' => ['groups'=> ['read:collection', 'read:item', 'read:dysfonctionnement']]
        ]
    ]      
)]
class Dysfonctionnement
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['read:collection', 'write'])]
    private $id;

    #[ORM\Column(type: 'text')]
    #[Groups(['read:collection', 'write'])]
    private $description;

    #[ORM\Column(type: 'datetime')]
    #[Groups(['read:collection', 'write'])]
    private $date;

    #[ORM\ManyToOne(targetEntity: Materiel::class, inversedBy: 'dysfonctionnements')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read:collection', 'write', "read:item"])]
    private $materiel;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'dysfonctionnements')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read:collection', 'write', "read:item"])]
    private $adherent;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

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
