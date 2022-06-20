<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\UserInfosController;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[ApiResource(normalizationContext: ['groups' => ['read:collection']])]
#[UniqueEntity(fields: ['uuid'], message: 'There is already an account with this uuid')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['read:collection','read:emprunt', 'read:dysfonctionnement'])]
    private $id;

    #[ORM\Column(type: 'string', length: 180, unique: true)]
    #[Groups(['read:collection', 'write'])]
    private $uuid;

    #[ORM\Column(type: 'json')]
    #[Groups(['read:collection'])]
    private $roles = [];

    #[ORM\Column(type: 'string')]
    #[Groups(['read:collection', 'write'])]
    private $password;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['read:collection', 'write','read:emprunt', 'read:dysfonctionnement'])]
    private $nom;

    #[ORM\OneToMany(mappedBy: 'adherent', targetEntity: Emprunt::class)]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['read'])]
    private $emprunts;

    #[ORM\OneToMany(mappedBy: 'adherent', targetEntity: Dysfonctionnement::class)]
    private $dysfonctionnements;

    #[ORM\OneToMany(mappedBy: 'emetteur', targetEntity: Transfert::class)]
    private $transfertsEmetteur;

    #[ORM\OneToMany(mappedBy: 'recepteur', targetEntity: Transfert::class)]
    private $transfertRecepteur;

    public function __construct()
    {
        $this->emprunts = new ArrayCollection();
        $this->dysfonctionnements = new ArrayCollection();
        $this->transfertsEmetteur = new ArrayCollection();
        $this->transfertRecepteur = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUuid(): ?string
    {
        return $this->uuid;
    }

    public function setUuid(string $uuid): self
    {
        $this->uuid = $uuid;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->uuid;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

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
            $emprunt->setAdherent($this);
        }

        return $this;
    }

    public function removeEmprunt(Emprunt $emprunt): self
    {
        if ($this->emprunts->removeElement($emprunt)) {
            // set the owning side to null (unless already changed)
            if ($emprunt->getAdherent() === $this) {
                $emprunt->setAdherent(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Dysfonctionnement>
     */
    public function getDysfonctionnements(): Collection
    {
        return $this->dysfonctionnements;
    }

    public function addDysfonctionnement(Dysfonctionnement $dysfonctionnement): self
    {
        if (!$this->dysfonctionnements->contains($dysfonctionnement)) {
            $this->dysfonctionnements[] = $dysfonctionnement;
            $dysfonctionnement->setAdherent($this);
        }

        return $this;
    }

    public function removeDysfonctionnement(Dysfonctionnement $dysfonctionnement): self
    {
        if ($this->dysfonctionnements->removeElement($dysfonctionnement)) {
            // set the owning side to null (unless already changed)
            if ($dysfonctionnement->getAdherent() === $this) {
                $dysfonctionnement->setAdherent(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Transfert>
     */
    public function getTransfertsEmetteur(): Collection
    {
        return $this->transfertsEmetteur;
    }

    public function addTransfertsEmetteur(Transfert $transfertsEmetteur): self
    {
        if (!$this->transfertsEmetteur->contains($transfertsEmetteur)) {
            $this->transfertsEmetteur[] = $transfertsEmetteur;
            $transfertsEmetteur->setEmetteur($this);
        }

        return $this;
    }

    public function removeTransfertsEmetteur(Transfert $transfertsEmetteur): self
    {
        if ($this->transfertsEmetteur->removeElement($transfertsEmetteur)) {
            // set the owning side to null (unless already changed)
            if ($transfertsEmetteur->getEmetteur() === $this) {
                $transfertsEmetteur->setEmetteur(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Transfert>
     */
    public function getTransfertRecepteur(): Collection
    {
        return $this->transfertRecepteur;
    }

    public function addTransfertRecepteur(Transfert $transfertRecepteur): self
    {
        if (!$this->transfertRecepteur->contains($transfertRecepteur)) {
            $this->transfertRecepteur[] = $transfertRecepteur;
            $transfertRecepteur->setRecepteur($this);
        }

        return $this;
    }

    public function removeTransfertRecepteur(Transfert $transfertRecepteur): self
    {
        if ($this->transfertRecepteur->removeElement($transfertRecepteur)) {
            // set the owning side to null (unless already changed)
            if ($transfertRecepteur->getRecepteur() === $this) {
                $transfertRecepteur->setRecepteur(null);
            }
        }

        return $this;
    }
}
