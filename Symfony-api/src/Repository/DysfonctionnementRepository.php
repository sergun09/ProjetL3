<?php

namespace App\Repository;

use App\Entity\Dysfonctionnement;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Dysfonctionnement>
 *
 * @method Dysfonctionnement|null find($id, $lockMode = null, $lockVersion = null)
 * @method Dysfonctionnement|null findOneBy(array $criteria, array $orderBy = null)
 * @method Dysfonctionnement[]    findAll()
 * @method Dysfonctionnement[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DysfonctionnementRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Dysfonctionnement::class);
    }

    public function add(Dysfonctionnement $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Dysfonctionnement $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return Dysfonctionnement[] Returns an array of Dysfonctionnement objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('d')
//            ->andWhere('d.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('d.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Dysfonctionnement
//    {
//        return $this->createQueryBuilder('d')
//            ->andWhere('d.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
