/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { TranslationSchema } from 'App/Type/TranslationSchema'

const fr: TranslationSchema = {
  common: {
    close: 'Fermer',
    cancel: 'Annuler',
    clear: 'Vider',
    confirm: 'Confirmer',
    create: 'Créer',
    start: 'Démarrer',
    remove: 'Supprimer',
    searchScripts: 'Rechercher',
    moreDetails: 'Plus de détails',
    edit: 'Modifier',
    noScripts: 'Aucun script',
    select: {
      file: 'Sélectionner un fichier',
      folder: 'Sélectionner un dossier',
    },
    papyrusFileSelectDialog: {
      title: 'Sélectionner un script Papyrus',
    },
  },
  nav: {
    compilation: 'Compilation',
    groups: 'Groupes',
    settings: 'Paramètres',
    logs: 'Logs',
    help: 'Aide',
    drawerClose: 'Fermer',
  },
  dialog: {
    recentFiles: {
      title: 'Fichiers récents',
      noRecentFiles: 'Aucun fichier récent',
      actions: {
        moreDetails: 'Plus de détails',
        load: 'Charger',
      },
    },
    logs: {
      title: 'Logs',
      noLogs: 'Aucun log',
    },
    group: {
      dropScripts: 'Glisser-déposer vos scripts ici',
      name: {
        label: 'Nom',
      },
      removing: {
        title: 'Suppression du groupe',
        content: 'Vous allez supprimer le groupe "{{name}}".',
      },
    },
    openDocumentation: {
      title: 'Ouvrir le site web de la documentation de PCA ?',
      text: "Trouvez toutes les infos sur l'utilisation de PCA",
      actions: {
        doNotShowAgain: 'Ne plus afficher',
      },
    },
  },
  page: {
    compilation: {
      dragAndDropText: 'Commencez par glisser-déposer des fichiers psc pour les charger',
      dragAndDropAdmin: "Cette fonctionnalité n'est pas disponible si PCA est lancé en mode administrateur.",
      appBar: {
        title: 'Compilation',
        actions: {
          recentFiles: 'Fichiers récents',
          group: 'Groupe',
        },
      },
    },
    groups: {
      createGroupText: 'Vous pouvez créer un groupe avec le bouton $t(common.create).',
      whatIsAGroup: 'Un groupe est un ensemble de scripts qui peut être ajoutés rapidement à la compilation.',
      appBar: {
        title: 'Groupes',
      },
    },
    settings: {
      appBar: {
        title: 'Paramètres',
        actions: {
          documentation: 'Documentation',
          refresh: 'Rafraîchir',
        },
      },
      sections: {
        game: {
          title: 'Jeu',
          games: {
            le: 'Skyrim LE',
            se: 'Skyrim SE',
            vr: 'Skyrim VR',
            fo4: 'Fallout 4',
          },
          gameFolder: {
            label: 'Dossier du jeu',
            tooltip: 'Dossier où se trouve {{executable}}',
          },
          compiler: {
            label: 'Compilateur Papyrus',
            tooltip:
              "Chemin vers le fichier PapyrusCompiler.exe. Le fichier est disponible après l'installation de CreationKit. Plus d'informations sur la documentation de PCA.",
          },
        },
        compilation: {
          title: 'Compilation',
          concurrentScripts: {
            label: 'Nombre de scripts compilés simultanéments',
            helperText: 'Réduisez si vous rencontrez des blocages quand vous lancez la compilation',
          },
        },
        mo2: {
          title: 'Mod Organizer 2',
          use: {
            label: 'Activer',
            helperText:
              "Activer l'intégration MO2 uniquement si PCA n'est pas lancé à partir de MO2. Plus d'informations sur la documentation de PCA.",
          },
          instance: {
            label: "Dossier de l'instance",
          },
        },
        theme: {
          title: 'Thème',
          options: {
            system: 'Système',
            light: 'Clair',
            dark: 'Sombre',
          },
        },
        telemetry: {
          title: "Données d'utilisation",
          use: {
            label: 'Activer',
          },
        },
      },
    },
  },
}

export default fr
