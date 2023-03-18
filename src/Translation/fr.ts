/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type TranslationSchema } from 'App/Type/TranslationSchema'

const fr: TranslationSchema = {
  common: {
    back: 'Retour',
    next: 'Suivant',
    skip: 'Passer',
    close: 'Fermer',
    cancel: 'Annuler',
    clear: 'Vider',
    confirm: 'Confirmer',
    create: 'Créer',
    start: 'Démarrer',
    remove: 'Supprimer',
    searchScripts: 'Rechercher',
    moreDetails: 'Plus de détails',
    lessDetails: 'Moins de détails',
    edit: 'Modifier',
    noScripts: 'Aucun script',
    recentFiles: 'Fichiers récents',
    group: 'Groupe',
    activate: 'Activer',
    select: {
      file: 'Sélectionner un fichier',
      folder: 'Sélectionner un dossier',
      all: 'Tout sélectionner',
      none: 'Tout désélectionner',
      invert: 'Inverser la sélection',
    },
    papyrusFileSelectDialog: {
      title: 'Sélectionner un script Papyrus',
    },
    confCheckError_gamePathDoesNotExist: 'Configuration invalide : vérifiez le chemin du jeu.',
    confCheckError_gameExeDoesNotExist:
      "Configuration invalide : vérifiez le chemin du jeu ({{gameExe}} n'a pas été trouvé).",
    confCheckError_compilerPathDoesNotExist: 'Configuration invalide : vérifiez le chemin du compilateur Papyrus.',
    confCheckError_compilerPathIsNotAFile:
      "Configuration invalide : vérifiez le chemin du compilateur Papyrus (le chemin n'est pas un fichier).",
    confCheckError_mo2InstanceIsNotSet:
      "Configuration invalide : Vous avez choisi d'utiliser l'intégration MO2, mais vous n'avez pas spécifié le chemin de l'instance.",
    confCheckError_mo2InstanceDoesNotExist: "Configuration invalide : Vérifiez le chemin de l'instance MO2.",
    confCheckError_mo2InstanceNoModsFolder:
      "Configuration invalide : Vérifiez le chemin de l'instance MO2 (le dossier 'mods' n'a pas été trouvé).",
    confCheckError_creationKitScriptDoesNotExist:
      "Configuration invalide : Vérifiez le chemin du jeu (les scripts provenant de CreationKit n'existe pas). Avez-vous décompressé le fichier Scripts.zip ?",
    confCheckError_fatalError:
      "Une erreur inconnue lors de la vérification de la configuration est survenue. Si vous pensez que cela est un bug provenant de PCA, vérifiez les fichiers de logs et obtenez un support sur le forum PCA sur NexusMods. Vous pouvez avoir de l'aide sur la documentation.",
    confCheckError_unknown: '$t(common.confCheckError_fatalError)',
    refresh: 'Rafraîchir',
    documentation: 'Documentation',
    copy: 'Copier',
    copySuccess: 'Copié avec succès',
    copyError: 'Erreur lors de la copie: {{error}}',
    createGroup: 'Créer un groupe',
    removeRecentScriptsError: 'Erreur lors de la suppression: {{error}}',
    youAreUsingLatestVersion: 'Vous disposez de la dernière version de PCA',
    newVersionAvailable: 'Nouvelle version disponible ({{version}})',
    changelogs: 'Notes de version <0>{{version}}</0>',
    download: 'Télécharger',
    openInBrowser: 'Ouvrir dans le navigateur',
    settingsTutorial: {
      welcome: {
        title: 'Configurer PCA',
        firstStartText:
          "C'est votre première utilisation de PCA. Nous vous recommandons de suivre le tutoriel pour vous familiariser avec l'application.",
        documentationText:
          "Assurez-vous d'avoir tous les prérequis. Vous pouvez consulter la <0>documentation</0> pour plus d'informations.",
        needHelpText: "J'ai besoin d'aide",
      },
      settings: {
        game: 'Enregistrez les informations de votre jeu',
        compiler: "Enregistrez le chemin vers le compilateur Papyrus. Disponible après l'installation de Creation Kit",
        concurrent: 'Enregistrez le nombre de scripts compilés en simultané.',
        mo2: 'Enregistrez vos informations MO2. Ignorez cette option si vous utilisez PCA à travers MO2',
      },
      compilation: {
        addScripts: 'Ajouter des scripts',
        compile:
          "Liste des scripts à compiler. Vous pourrez créer des groupes afin d'y ajouter un ensemble de scripts rapidement.",
        createGroupFromScriptsList: 'Créer un groupe depuis la liste des scripts actuelle.',
      },
      groups: {
        whatAreGroups: "Qu'est-ce qu'un groupe ?",
      },
      documentation: "Toutefois, vous pouvez consulter la documentation pour plus d'informations.",
    },
    telemetry: {
      title: "Partager l'analyse",
      text: "Aidez PCA a améliorer l'application en envoyant automatiquement les données anonymes de diagnostic et d'utilisation.",
    },
    refuse: 'Refuser',
    accept: 'Accepter',
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
            label: 'Nombre de scripts compilés simultanément',
            helperText: 'Réduisez si vous rencontrez des blocages quand vous lancez la compilation',
          },
        },
        mo2: {
          title: 'Mod Organizer 2',
          use: {
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
      },
    },
  },
}

export default fr
