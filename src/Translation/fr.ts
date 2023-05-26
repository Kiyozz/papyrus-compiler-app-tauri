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
    clearList: 'Vider la liste',
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
    failed: 'Échec',
    succeeded: 'Succès',
    actions: 'Actions',
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
    seeChangelogs: 'Notes de version',
    download: 'Télécharger',
    openInBrowser: 'Ouvrir dans le navigateur',
    settingsTutorial: {
      welcome: {
        title: 'Configurer PCA',
        firstStartText:
          "C'est votre première utilisation de PCA. Nous vous recommandons de suivre le tutoriel pour vous familiariser avec l'application.",
        documentationText:
          "Assurez-vous d'avoir tous les prérequis. Vous pouvez consulter la <0>documentation</0> pour plus d'informations.",
        needHelpText: "C'est la première fois que j'utilise PCA",
      },
      settings: {
        game: 'Commencez par enregistrer les détails de votre jeu',
        compiler:
          "Ensuite, spécifiez le chemin vers le compilateur Papyrus, qui sera disponible après l'installation de Creation Kit",
        concurrent:
          "De manière optionnelle, vous pouvez paramétrer le nombre de scripts compilés simultanément. Augmenter ce nombre peut accélérer la compilation, mais cela augmentera aussi l'utilisation de votre processeur",
        mo2: "Si vous le souhaitez, vous pouvez ajouter les informations de votre instance MO2. Notez que cette étape n'est pas nécessaire si vous utilisez PCA via MO2",
      },
      compilation: {
        addScripts: 'Continuez en ajoutant des scripts',
        compile:
          'Vous trouverez ensuite la liste des scripts à compiler. À ce stade, vous pouvez créer des groupes pour ajouter rapidement un ensemble de scripts.',
        createGroupFromScriptsList: 'Vous pouvez créer un groupe à partir de la liste actuelle des scripts.',
      },
      documentation:
        "N'oubliez pas que vous pouvez toujours consulter la documentation pour obtenir des informations supplémentaires.",
    },
    telemetry: {
      title: "Partager l'analyse",
      text: "Contribuez à l'amélioration de PCA en autorisant l'envoi automatique de données de diagnostic et d'utilisation anonymisées.",
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
      displayErrorOnly: 'Afficher uniquement les erreurs',
    },
    group: {
      dropScripts: 'Glisser-déposer vos scripts ici',
      name: {
        label: 'Nom',
      },
      removing: {
        title: "Suppression d'un groupe",
        content: 'Le groupe "{{name}}" sera supprimé.',
      },
    },
    openDocumentation: {
      title: 'Documentation de PCA',
      text: "Vous êtes sur le point d'accéder au site web de la documentation PCA. Ce site contient toutes les informations requises pour l'utilisation et la configuration de PCA.\n\nEn cas de problème, après avoir consulté la section 'Troubleshooting' de la documentation, n'hésitez pas à soumettre un message sur NexusMods.",
      actions: {
        doNotShowAgain: 'Ne plus afficher',
      },
    },
  },
  page: {
    compilation: {
      dragAndDropText: 'Glisser-déposer des fichiers psc pour les charger',
      dragAndDropAdmin:
        'Veuillez noter que si PCA est exécuté en mode administrateur, cette fonctionnalité spécifique ne sera pas disponible.',
      appBar: {
        title: 'Compilation',
      },
    },
    groups: {
      createGroupText:
        'Vous avez la possibilité de créer un groupe. Un tel groupe correspond à un ensemble de scripts conçus pour être ajoutés rapidement à la compilation.',
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
            se: 'Skyrim SE/AE',
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
            helperText:
              'Si des blocages se produisent lors du lancement de la compilation, nous vous recommandons de diminuer ce nombre.',
          },
        },
        mo2: {
          title: 'Mod Organizer 2',
          use: {
            helperText:
              "Si PCA n'est pas démarré via MO2, vous pouvez activer l'intégration MO2. Pour plus d'informations, consultez la documentation de PCA.",
          },
          instance: {
            label: "Dossier de l'instance",
          },
          activateIntegration: "Activer l'intégration MO2",
        },
        theme: {
          title: 'Thème',
          options: {
            system: 'Système',
            light: 'Clair',
            dark: 'Sombre',
          },
          activateTelemetry: 'Activer l’analyse',
        },
      },
    },
  },
}

export default fr
