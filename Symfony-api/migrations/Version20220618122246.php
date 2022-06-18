<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220618122246 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE dysfonctionnement_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE transfert_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE dysfonctionnement (id INT NOT NULL, materiel_id INT NOT NULL, adherent_id INT NOT NULL, description TEXT NOT NULL, date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_1CBDDC0916880AAF ON dysfonctionnement (materiel_id)');
        $this->addSql('CREATE INDEX IDX_1CBDDC0925F06C53 ON dysfonctionnement (adherent_id)');
        $this->addSql('CREATE TABLE transfert (id INT NOT NULL, emetteur_id INT NOT NULL, recepteur_id INT NOT NULL, etat BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_1E4EACBB79E92E8C ON transfert (emetteur_id)');
        $this->addSql('CREATE INDEX IDX_1E4EACBB3B49782D ON transfert (recepteur_id)');
        $this->addSql('ALTER TABLE dysfonctionnement ADD CONSTRAINT FK_1CBDDC0916880AAF FOREIGN KEY (materiel_id) REFERENCES materiel (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE dysfonctionnement ADD CONSTRAINT FK_1CBDDC0925F06C53 FOREIGN KEY (adherent_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE transfert ADD CONSTRAINT FK_1E4EACBB79E92E8C FOREIGN KEY (emetteur_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE transfert ADD CONSTRAINT FK_1E4EACBB3B49782D FOREIGN KEY (recepteur_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE dysfonctionnement_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE transfert_id_seq CASCADE');
        $this->addSql('DROP TABLE dysfonctionnement');
        $this->addSql('DROP TABLE transfert');
    }
}
