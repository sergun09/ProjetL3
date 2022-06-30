<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220624011223 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE dysfonctionnement_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE emprunt_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE materiel_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE reparation_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE transfert_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE type_materiel_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "user_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE dysfonctionnement (id INT NOT NULL, materiel_id INT NOT NULL, adherent_id INT NOT NULL, description TEXT NOT NULL, date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_1CBDDC0916880AAF ON dysfonctionnement (materiel_id)');
        $this->addSql('CREATE INDEX IDX_1CBDDC0925F06C53 ON dysfonctionnement (adherent_id)');
        $this->addSql('CREATE TABLE emprunt (id INT NOT NULL, materiel_id INT DEFAULT NULL, adherent_id INT DEFAULT NULL, datedebut TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, datefin TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, motif VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_364071D716880AAF ON emprunt (materiel_id)');
        $this->addSql('CREATE INDEX IDX_364071D725F06C53 ON emprunt (adherent_id)');
        $this->addSql('CREATE TABLE materiel (id INT NOT NULL, type_materiel_id INT DEFAULT NULL, intitule VARCHAR(255) NOT NULL, description VARCHAR(255) DEFAULT NULL, kit VARCHAR(255) NOT NULL, conditionnement VARCHAR(255) NOT NULL, etat VARCHAR(255) NOT NULL, emprunt VARCHAR(255) NOT NULL, montant_caution INT DEFAULT NULL, commentaire VARCHAR(255) DEFAULT NULL, en_maintenance BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_18D2B0915D91DD3E ON materiel (type_materiel_id)');
        $this->addSql('CREATE TABLE reparation (id INT NOT NULL, materiel_id INT DEFAULT NULL, nom VARCHAR(255) NOT NULL, description TEXT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_8FDF219D16880AAF ON reparation (materiel_id)');
        $this->addSql('CREATE TABLE transfert (id INT NOT NULL, emetteur_id INT NOT NULL, recepteur_id INT NOT NULL, materiel_id INT NOT NULL, etat BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_1E4EACBB79E92E8C ON transfert (emetteur_id)');
        $this->addSql('CREATE INDEX IDX_1E4EACBB3B49782D ON transfert (recepteur_id)');
        $this->addSql('CREATE INDEX IDX_1E4EACBB16880AAF ON transfert (materiel_id)');
        $this->addSql('CREATE TABLE type_materiel (id INT NOT NULL, nom VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE "user" (id INT NOT NULL, uuid VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, nom VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649D17F50A6 ON "user" (uuid)');
        $this->addSql('ALTER TABLE dysfonctionnement ADD CONSTRAINT FK_1CBDDC0916880AAF FOREIGN KEY (materiel_id) REFERENCES materiel (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE dysfonctionnement ADD CONSTRAINT FK_1CBDDC0925F06C53 FOREIGN KEY (adherent_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE emprunt ADD CONSTRAINT FK_364071D716880AAF FOREIGN KEY (materiel_id) REFERENCES materiel (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE emprunt ADD CONSTRAINT FK_364071D725F06C53 FOREIGN KEY (adherent_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE materiel ADD CONSTRAINT FK_18D2B0915D91DD3E FOREIGN KEY (type_materiel_id) REFERENCES type_materiel (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE reparation ADD CONSTRAINT FK_8FDF219D16880AAF FOREIGN KEY (materiel_id) REFERENCES materiel (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE transfert ADD CONSTRAINT FK_1E4EACBB79E92E8C FOREIGN KEY (emetteur_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE transfert ADD CONSTRAINT FK_1E4EACBB3B49782D FOREIGN KEY (recepteur_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE transfert ADD CONSTRAINT FK_1E4EACBB16880AAF FOREIGN KEY (materiel_id) REFERENCES materiel (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE dysfonctionnement DROP CONSTRAINT FK_1CBDDC0916880AAF');
        $this->addSql('ALTER TABLE emprunt DROP CONSTRAINT FK_364071D716880AAF');
        $this->addSql('ALTER TABLE reparation DROP CONSTRAINT FK_8FDF219D16880AAF');
        $this->addSql('ALTER TABLE transfert DROP CONSTRAINT FK_1E4EACBB16880AAF');
        $this->addSql('ALTER TABLE materiel DROP CONSTRAINT FK_18D2B0915D91DD3E');
        $this->addSql('ALTER TABLE dysfonctionnement DROP CONSTRAINT FK_1CBDDC0925F06C53');
        $this->addSql('ALTER TABLE emprunt DROP CONSTRAINT FK_364071D725F06C53');
        $this->addSql('ALTER TABLE transfert DROP CONSTRAINT FK_1E4EACBB79E92E8C');
        $this->addSql('ALTER TABLE transfert DROP CONSTRAINT FK_1E4EACBB3B49782D');
        $this->addSql('DROP SEQUENCE dysfonctionnement_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE emprunt_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE materiel_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE reparation_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE transfert_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE type_materiel_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE "user_id_seq" CASCADE');
        $this->addSql('DROP TABLE dysfonctionnement');
        $this->addSql('DROP TABLE emprunt');
        $this->addSql('DROP TABLE materiel');
        $this->addSql('DROP TABLE reparation');
        $this->addSql('DROP TABLE transfert');
        $this->addSql('DROP TABLE type_materiel');
        $this->addSql('DROP TABLE "user"');
    }
}
