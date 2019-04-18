export const scopeData = {
  1: {
    name: "GSHM Software Setup",
    overview: "Get the most out of your membership. Let a Geek Squad Agent install and configure your included Antivirus and Data Backup software. We’ll even scan your system for potential threats and show you how to configure and access you secured data.  NOTE: In-Home Service is an add-on only. Agents are to follow primary SOW guidelines from the associated core services.",
    confirm: {
      all: [
        'Confirm that the client has a valid GSHM account using the Membership Validation Portal',
        'Ensure setup form is properly completed.'
      ],
      inhome: [
        'Prior to arrival check to see if service requires delivery and ensure equipment is onboard',
        'Validate receipt and ensure GRID service requested matches receipt',
        'Confirm the appointment with the client while on-route'
      ]
    },
    arrive: {
      all: [],
      inhome: [
        'Collect product and tools required for service and take to door',
        'Greet the client and introduce yourself and explain the purpose of your visit',
        'Assess additional client needs by asking lifestyle questions ensure to record recommended services',
        'Complete Site Survey form and get initial from client for approval to proceed with service'
      ]
    },
    service: {
      all: [
        'Confirm with client that initial Welcome Email was received. Engage Geek Squad Online Support or Self Service Portal for account updates.',
        'Add desktop shortcut access to Geek Squad Membership Self-Service Portal (See Resources)',
        'Add desktop shortcut access to www.geeksquad.ca/connectnow',
        'Bitdefender installed and activated',
        'Acronis True Image Cloud installed and activated  with backups configured'
      ],
      inhome: [
        'Perform a Network Analysis. Advise client of results and offer recommendations to improve performance, if required.',
        'Identify any GSHM applicable product in the client’s home and perform basic cable management services, as required.'
      ]
    },
    tutorial: {
      all: [
        'Demonstrate to client how to access self-service Membership portal (See Resources)',
        'Guide client through process of scheduling a backup in Data Backup Software'
      ],
      inhome: [
        'ensure client understands how to contact Geek Squad Online Support (see Resources).'
      ]
    },
    data: {
      time: 30,
      people: 1,
      skill: 'Basic PC and Apple support',
      price: {
        instore: 49.99,
        inhome: 79.99
      },
      exclusions: [
        'hardware',
        'hardware installations'
      ]
    }
  }
}
