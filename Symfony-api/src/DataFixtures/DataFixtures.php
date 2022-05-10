<?php

namespace App\DataFixtures;

use App\Entity\Emprunt;
use App\Entity\Materiel;
use App\Entity\Reparation;
use App\Entity\TypeMateriel;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class DataFixtures extends Fixture
{

    public function load(ObjectManager $manager): void
    {
        $faker = \Faker\Factory::create("fr_FR");
        for ($i=1; $i <=5 ; $i++ ){
            $t = new TypeMateriel();
            $t ->setNom("type $i");
            $manager->persist($t);

            }

        for ($i=1; $i <=2 ; $i++ ){
            $m = new Materiel();
            $m -> setCommentaire($faker ->text());
            $m->setDescription($faker->realText());
            $m->setConditionnement($faker -> name());
            $m ->setEmprunt($faker -> firstName());
            $m ->setEnMaintenance($faker -> boolean());
            $m ->setEtat($faker -> colorName());
            $m ->setIntitule($faker  ->name());
            $m ->setKit($faker -> name());
            $m ->setMontantCaution($faker ->numberBetween(100,1000));

            $manager->persist($m);


        }


        for ($i=1; $i <=10 ; $i++ ){
            $r = new Reparation();
           $r -> setNom($faker ->name());
           $r -> setDescription($faker ->text());
            $manager->persist($r);

        }
        for ($i=1; $i <=10 ; $i++ ){
            $e = new Emprunt();
            $e ->setDatedebut($faker ->dateTime());
            $e ->setDatefin($faker ->dateTime());
            $e ->setMotif("motif $i");
            $manager->persist($e);

        }
        for ($i=1; $i <=10 ; $i++ ){
            $u = new User();
            $u ->setNom($faker -> firstName())
                ->setPassword("secret");

            $u ->setUuid($faker -> uuid());
            $manager->persist($u);

        }



        $manager->flush();
    }
}
