<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\MaterielRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: MaterielRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['read:collection']],
    denormalizationContext: ['groups' => ['write']], 
    itemOperations: [
        'put' ,
        'delete',
        'get' => [
            'normalization_context' => ['groups'=> ['read:collection', 'read:item', 'read:materiel']]
        ]
    ]
        ),ApiFilter(SearchFilter::class, properties: ['typeMateriel' => 'exact', 'intitule'  => 'exact', 'etat'  => 'exact', 'emprunt'  => 'exact'])
        ]
class Materiel
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['read:collection','write','read:reparation', 'read:emprunt'])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['read:collection','write','read:reparation', 'read:emprunt'])]
    private $intitule;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(['read:collection','write'])]
    private $description;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['read:collection','write'])]
    private $kit;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['read:collection','write'])]
    private $conditionnement;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['read:collection','write'])]
    private $etat;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['read:collection','write', 'read:emprunt'])]
    private $emprunt;

    #[ORM\Column(type: 'integer', nullable: true)]
    #[Groups(['read:collection','write'])]
    private $montantCaution;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(['read:collection','write'])]
    private $commentaire;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['read:collection','write'])]
    private $enMaintenance;

    #[ORM\ManyToOne(targetEntity: TypeMateriel::class, inversedBy: 'materiels')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(["read:item",'write','read:collection'])]
    private $typeMateriel;

    #[ORM\OneToMany(mappedBy: 'materiel', targetEntity: Emprunt::class)]
    #[ORM\JoinColumn(nullable: true)]
    private $emprunts;

    #[ORM\OneToMany(mappedBy: 'materiel', targetEntity: Reparation::class)]
    #[ORM\JoinColumn(nullable: true)]
    private $reparation;

    public function __construct()
    {
        $this->emprunts = new ArrayCollection();
        $this->reparation = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIntitule(): ?string
    {
        return $this->intitule;
    }

    public function setIntitule(string $intitule): self
    {
        $this->intitule = $intitule;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getKit(): ?string
    {
        return $this->kit;
    }

    public function setKit(string $kit): self
    {
        $this->kit = $kit;

        return $this;
    }

    public function getConditionnement(): ?string
    {
        return $this->conditionnement;
    }

    public function setConditionnement(string $conditionnement): self
    {
        $this->conditionnement = $conditionnement;

        return $this;
    }

    public function getEtat(): ?string
    {
        return $this->etat;
    }

    public function setEtat(string $etat): self
    {
        $this->etat = $etat;

        return $this;
    }

    public function getEmprunt(): ?string
    {
        return $this->emprunt;
    }

    public function setEmprunt(string $emprunt): self
    {
        $this->emprunt = $emprunt;

        return $this;
    }

    public function getMontantCaution(): ?int
    {
        return $this->montantCaution;
    }

    public function setMontantCaution(?int $montantCaution): self
    {
        $this->montantCaution = $montantCaution;

        return $this;
    }

    public function getCommentaire(): ?string
    {
        return $this->commentaire;
    }

    public function setCommentaire(?string $commentaire): self
    {
        $this->commentaire = $commentaire;

        return $this;
    }

    public function getEnMaintenance(): ?bool
    {
        return $this->enMaintenance;
    }

    public function setEnMaintenance(bool $enMaintenance): self
    {
        $this->enMaintenance = $enMaintenance;

        return $this;
    }

    public function getTypeMateriel(): ?TypeMateriel
    {
        return $this->typeMateriel;
    }

    public function setTypeMateriel(?TypeMateriel $typeMateriel): self
    {
        $this->typeMateriel = $typeMateriel;

        return $this;
    }

    /**
     * @return Collection<int, Emprunt>
     */
    public function getEmprunts(): Collection
    {
        return $this->emprunts;
    }

    public function addEmprunt(Emprunt $emprunt): self
    {
        if (!$this->emprunts->contains($emprunt)) {
            $this->emprunts[] = $emprunt;
            $emprunt->setMateriel($this);
        }

        return $this;
    }

    public function removeEmprunt(Emprunt $emprunt): self
    {
        if ($this->emprunts->removeElement($emprunt)) {
            // set the owning side to null (unless already changed)
            if ($emprunt->getMateriel() === $this) {
                $emprunt->setMateriel(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Reparation>
     */
    public function getReparation(): Collection
    {
        return $this->reparation;
    }

    public function addReparation(Reparation $reparation): self
    {
        if (!$this->reparation->contains($reparation)) {
            $this->reparation[] = $reparation;
            $reparation->setMateriel($this);
        }

        return $this;
    }

    public function removeReparation(Reparation $reparation): self
    {
        if ($this->reparation->removeElement($reparation)) {
            // set the owning side to null (unless already changed)
            if ($reparation->getMateriel() === $this) {
                $reparation->setMateriel(null);
            }
        }

        return $this;
    }
}
