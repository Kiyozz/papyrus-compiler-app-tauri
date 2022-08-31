/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { TranslationSchema } from 'App/Type/TranslationSchema'

const fr: TranslationSchema = {
  common: {
    cancel: 'Annuler',
    clear: 'Vider',
    close: 'Fermer',
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
      title: 'Groupe',
      dropScripts: 'Glisser-déposer vos scripts ici',
      actions: {
        edit: 'Editer',
        create: 'Créer',
        searchScripts: 'Rechercher',
      },
    },
  },
  page: {
    compilation: {
      dragAndDropText: 'Commencez par glisser-déposer des fichiers psc pour les charger',
      dragAndDropAdmin: "Cette fonctionnalité n'est pas disponible si PCA est lancé en mode administrateur.",
      appBar: {
        actions: {
          recentFiles: 'Fichiers récents',
          group: 'Groupe',
          searchScripts: 'Rechercher',
        },
      },
    },
    groups: {
      createGroupText: 'Vous pouvez créer un groupe avec le bouton $t(page.groups.appBar.actions.create).',
      whatIsAGroup: 'Un groupe est un ensemble de scripts qui peut être ajoutés rapidement à la compilation.',
      appBar: {
        actions: {
          create: 'Créer',
        },
      },
    },
    settings: {
      appBar: {
        actions: {
          documentation: 'Documentation',
          refresh: 'Rafraîchir',
        },
      },
    },
  },
}

export default fr
