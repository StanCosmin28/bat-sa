export const products = [
  // ─── POWER MODULES ───────────────────────────────────────────────────────────
  {
    key: "mrm_80_1900",
    name: "MRM 80-1900",
    category: "power_modules",
    categoryLabel: "Power Modules",
    info: "Control CPU for relay circuits",
    description: `<p>The CPU circuit control unit with relay is an intelligent electronic card provided with a programmable microprocessor (electronic integrated circuit equipped with memory RAM, ROM and EEPROM) for the acquisition of 8 potential free contacts for the management of inputs and for the management of 8 outputs (relays).</p>
<p>The inputs are for managing the 8 outputs, managing scenes and scenarios, and within a GTC framework the inputs will be transferred towards another module to activate a device, for counting of time and/or impulse.</p>
<p>The module can pilot 8 outputs with 12/24/240 V 8A DC/AC and it is recommended for piloting engines, lighting.</p>
<p>The CPU can be connected via BUS to other BAT modules. The home automation software and GTC FreeDOM also allows module programming and supervision.</p>`,
    characteristics: `<ul><li>8 inputs for completely programmable dry contact points</li><li>8 unipolar all or nothing relay outputs for 12/24/240 V AC/DC load</li><li>24 memory for internal logical operations</li><li>Transfer of inputs towards other modules</li><li>Block with BUS terminals for the connection of additional modules</li><li>Programming by FreeDOM Software</li><li>99 programming steps of scenarios</li><li>User memory not volatile and reprogrammable</li><li>Maximum current per output: 12A (resistive load), 7A (inductive load)</li><li>Check status by LEDS</li><li>Rail DIN assembly</li></ul>`,
    wiring: "",
  },
  {
    key: "mrm_80_1000",
    name: "MRM 80-1000",
    category: "power_modules",
    categoryLabel: "Power Modules",
    info: "Control CPU for relay circuits",
    description: `<p>The CPU circuit control unit with relay is an intelligent electronic card provided with a programmable microprocessor (RAM, ROM and EEPROM) for the acquisition of 8 potential free contacts for the management of inputs and 8 outputs (relays).</p>
<p>The module can pilot 8 outputs with 12/24/240 V DC/AC and it is recommended for piloting engines, lighting.</p>
<p>The home automation software and GTC FreeDOM also allows module programming and supervision.</p>`,
    characteristics: `<ul><li>8 inputs for completely programmable dry contact points</li><li>8 unipolar all or nothing relay outputs for 12/24/240 V AC/DC load</li><li>24 memory for internal logical operations</li><li>Transfer of inputs towards other modules</li><li>Block with BUS terminals for the connection of additional modules</li><li>Programming by FreeDOM Software</li><li>99 programming steps of scenarios</li><li>User memory not volatile and reprogrammable</li><li>Maximum current per output: 5A (resistive load), 2A (inductive load)</li><li>Check status by LEDS</li><li>Rail DIN assembly</li></ul>`,
    wiring: "",
  },
  {
    key: "mri_80_1900",
    name: "MRI 80-1900",
    category: "power_modules",
    categoryLabel: "Power Modules",
    info: "Control CPU for relay inverter circuits",
    description: `<p>The CPU circuit control unit with relay inverter is an intelligent electronic card provided with a programmable microprocessor (RAM, ROM and EEPROM) for the acquisition of 8 potential free contacts and the management of 8 relay outputs. The module pilots 8 outputs with 12/24/240 V DC/AC, low power.</p>
<p>The CPU can be connected via BUS to other BAT modules. The home automation software and GTC FreeDOM also allows module programming and supervision.</p>`,
    characteristics: `<ul><li>8 inputs for completely programmable dry contact points</li><li>8 unipolar all or nothing relay outputs for 12/24/240 V AC/DC load</li><li>24 memory for internal logical operations</li><li>Transfer of inputs towards other modules</li><li>Block with BUS terminals for the connection of additional modules</li><li>Programming by FreeDOM Software</li><li>99 programming steps of scenarios</li><li>User memory not volatile and reprogrammable</li><li>Maximum current per output: 5A (resistive load), 2A (inductive load)</li><li>Check status by LEDS</li><li>Rail DIN assembly</li></ul>`,
    wiring: "",
  },
  {
    key: "mv220_2000",
    name: "MV220-2000",
    category: "power_modules",
    categoryLabel: "Power Modules",
    info: "Control CPU for 220V shutters",
    description: `<p>The 220V Shutter Control CPU is an intelligent electronic card (RAM, ROM and EEPROM) for the acquisition of 4 potential free contacts for the management of a shutter/blind. This module can operate on its own or in a group via BUS configuration.</p>
<p>Inputs are provided for the control of 2 outputs (up and down), or as part of a CTM, inputs will be transferred to another module to activate a device for counting of time and/or impulse.</p>`,
    characteristics: `<ul><li>4 inputs for dry contact points</li><li>2 unipolar all or nothing relay outputs for 220 V AC</li><li>24 memory for internal logical operations</li><li>Transfer of inputs towards other modules</li><li>User memory not volatile and reprogrammable</li><li>Programming by FreeDOM Software or by parameter setting via rotary switch</li><li>Blocks with screw in terminals</li></ul>`,
    wiring: "",
  },

  // ─── VARIATION MODULES ────────────────────────────────────────────────────────
  {
    key: "mt_40_1600",
    name: "MT 40-1600",
    category: "variation_modules",
    categoryLabel: "Variation Modules",
    info: "CPU dimmer 240 VAC",
    description: `<p>The CPU circuit control unit with variable intensity is an intelligent electronic card (RAM, ROM and EEPROM) for the acquisition of 8 potential free contacts and for managing 4 early phase outputs switching inverters.</p>
<p>The inputs pilot 4 outputs of 2A each (input 1 to 4), control scenes and scenarios (input 5 to 8), and within a GTC framework the input can be transferred towards another module for counting of time and/or impulse.</p>
<p>The CPU can be connected via BUS to other BAT modules. The home automation software and GTC FreeDOM also allows module programming and supervision.</p>`,
    characteristics: `<ul><li>8 inputs for completely programmable dry contact points</li><li>4 outputs of 2A each with variable intensity</li><li>24 memories for internal logical operations</li><li>Electronic protection against short circuits and overload</li><li>Automatic temperature fuse switch at ~85°C independently on each output</li><li>Transfer of inputs towards other modules on the BUS</li><li>Programming by FreeDOM Software</li><li>60 programming steps of scenarios</li><li>Additional set for over 20 functions available for programming</li><li>User memory not volatile and reprogrammable</li><li>Check status by LEDS</li><li>Rail DIN Assembly</li></ul>`,
    wiring: "",
  },
  {
    key: "mdl_24_4101",
    name: "MDL 24-4101",
    category: "variation_modules",
    categoryLabel: "Variation Modules",
    info: "CPU dimmer LED",
    description: `<p>The CPU with variable intensity is an intelligent electronic card (RAM, ROM and EEPROM) for the acquisition of 8 free of potential contacts and for managing 4 outputs with variable intensity for LED lighting. The variation is achieved by pulse width modulation at a frequency of 200Hz.</p>
<p>The module is divided into two parts: bus and power, which are galvanically isolated. Each outlet is equipped with temperature protection and overcurrent protection.</p>`,
    characteristics: `<ul><li>8 inputs for completely programmable dry contact points</li><li>4 outputs for the node (+) common to the variation of LED lighting</li><li>24 memories for internal logical operations</li><li>Bus and power galvanically isolated</li><li>Maximum output current: 10A, 12/24VDC tension</li><li>Transfer of inputs towards other modules</li><li>Block with BUS terminals for the connection of additional modules</li><li>Programming by FreeDOM Software</li><li>60 programming steps of scenario</li><li>Additional set for over 20 functions available for programming</li><li>User memory not volatile and reprogrammable</li><li>Check status by LEDS</li><li>Rail DIN Assembly</li></ul>`,
    wiring: "",
  },
  {
    key: "msa_80_010",
    name: "MSA 80-010",
    category: "variation_modules",
    categoryLabel: "Variation Modules",
    info: "CPU 8 analog outputs 0-10V",
    description: `<p>The CPU control unit with variable intensity is an intelligent electronic card (RAM, ROM and EEPROM) for the acquisition of 8 free of potential contacts for the management of inputs, and for the piloting of 8 analogue outputs 0-10VDC.</p>
<p>Within a GTC framework the inputs can be transferred towards another module to activate a device. The home automation software and GTC FreeDOM also allows module programming and supervision.</p>`,
    characteristics: `<ul><li>8 inputs for completely programmable dry contact points</li><li>8 × 0/10VDC outputs</li><li>24 memory for internal logical operations</li><li>Transfer of inputs towards other modules</li><li>Block with BUS terminals for the connection of additional modules</li><li>Programming by FreeDOM Software</li><li>99 programming steps of scenarios</li><li>User memory not volatile and reprogrammable</li><li>Check status by LEDS</li><li>Rail DIN assembly</li></ul>`,
    wiring: "",
  },
  {
    key: "msa_10_010",
    name: "MSA 10-010",
    category: "variation_modules",
    categoryLabel: "Variation Modules",
    info: "CPU 1 analog output 0-10V",
    description: `<p>The CPU control unit is an intelligent electronic card (RAM, ROM and EEPROM) for the acquisition of 1 analogue output (0-10VDC). We can connect devices that have 0-10VDC control input.</p>`,
    characteristics: `<ul><li>1 × 0-10 VDC output</li><li>Programming by FreeDOM Software</li><li>Check status by LEDS</li><li>Rail DIN assembly</li><li>Blocks with borders to be screwed</li></ul>`,
    wiring: "",
  },
  {
    key: "mpw_80_ac",
    name: "MPW 80-AC",
    category: "variation_modules",
    categoryLabel: "Variation Modules",
    info: "Control CPU for circuits with variable intensity",
    description: `<p>The CPU control unit is a dimmable intelligent electronic card (RAM, FLASH & EEPROM) for the acquisition of eight potential free contacts and to manage 8 outlets pulse width modulation (PWM) in very low voltage (VLV).</p>
<p>PWM outputs are synchronized to the mains frequency (240VAC) at a frequency of 100 Hz. The connected phase acts as a reference for the variation on the other phases.</p>`,
    characteristics: `<ul><li>8 programmable inputs for potential free contacts</li><li>8 outputs with pulse width modulation (frequency 100 Hz)</li><li>24 memories for internal logical operations</li><li>Transfer of inputs towards other modules</li><li>Block with BUS terminals for the connection of additional modules</li><li>Programming by FreeDOM Software</li><li>60 programming steps of scenarios</li><li>Additional set for over 20 functions available for programming</li><li>User memory not volatile and reprogrammable</li><li>Check status by LEDS</li><li>Rail DIN Assembly</li></ul>`,
    wiring: "",
  },
  {
    key: "mpw_80_dc",
    name: "MPW 80-DC",
    category: "variation_modules",
    categoryLabel: "Variation Modules",
    info: "Control CPU for circuits with variable intensity",
    description: `<p>The CPU control unit is a dimmable intelligent electronic card (RAM, FLASH & EEPROM) for the acquisition of eight potential free contacts and to manage 8 outlets pulse width modulation (PWM) in very low voltage (VLV).</p>
<p>PWM outputs are synchronized to the mains frequency (240VAC) at a frequency of 200 Hz. The connected phase acts as a reference for the variation on the other phases.</p>`,
    characteristics: `<ul><li>8 programmable inputs for potential free contacts</li><li>8 outputs with pulse width modulation (frequency 200 Hz)</li><li>24 memories for internal logical operations</li><li>Transfer of inputs towards other modules</li><li>Block with BUS terminals for the connection of additional modules</li><li>Programming by FreeDOM Software</li><li>60 programming steps of scenarios</li><li>Additional set for over 20 functions available for programming</li><li>User memory not volatile and reprogrammable</li><li>Check status by LEDS</li><li>Rail DIN Assembly</li></ul>`,
    wiring: "",
  },

  // ─── ACQUISITION MODULES ─────────────────────────────────────────────────────
  {
    key: "mdi_3200",
    name: "MDI 3200",
    category: "acquisition_modules",
    categoryLabel: "Acquisition Modules",
    info: "Acquisition CPU for potentialfree contacts",
    description: `<p>The acquisition CPU is an intelligent electronic card (RAM, ROM and EEPROM) for the acquisition of 32 free of potential contacts for the management of input within the framework of a technical centralized management (GTC). It is preferable to use a shielded cable for input connections.</p>
<p>The module allows the management of 16 time counters and 16 impulse counters. In the latest firmware version, we can choose either time or pulse counter for each input.</p>`,
    characteristics: `<ul><li>32 completely programmable inputs for dry contacts</li><li>In the latest firmware: choose time or pulse counter for each input</li><li>Block with BUS terminals for the connection of additional modules</li><li>Programming by FreeDOM software</li><li>Rail DIN Assembly</li><li>Removable Terminal Blocks</li></ul>`,
    wiring: "",
  },
  {
    key: "mai_8_vi_in",
    name: "MAI 8 VI-IN",
    category: "acquisition_modules",
    categoryLabel: "Acquisition Modules",
    info: "Acquisition CPU for 4-20 mA & 0-10 V",
    description: `<p>The acquisition CPU is an intelligent electronic card (RAM, ROM and EEPROM) for the acquisition of 8 potential free contacts and/or 8 analogical 4-20mA signals and/or 0-10V for input management within a GTC framework (defect alarms, temperature, pressure). It is preferable to use a shielded cable for analogical inputs.</p>
<p>The Freedom GTC software enables the acquisition of analog values and fault contacts that will be used in the monitoring and analysis of the building.</p>`,
    characteristics: `<ul><li>8 inputs for completely programmable dry contact points</li><li>8 analogical inputs type 4-20 mA or 0-10 Volts</li><li>Block with BUS terminals for the connection of additional modules</li><li>Programming by FreeDOM Software</li><li>User memory not volatile and reprogrammable</li><li>24 memories and 99 steps of programming of scenarios</li><li>Check status by LEDS</li><li>Rail DIN Assembly</li><li>Blocks with press clamps</li></ul>`,
    wiring: "",
  },
  {
    key: "mpt_80_1000",
    name: "MPT 80-1000",
    category: "acquisition_modules",
    categoryLabel: "Acquisition Modules",
    info: "Acquisition CPU for PT1000 sensor",
    description: `<p>The PT1000 CPU measurement sensor is an intelligent electronic card (RAM, FLASH & EEPROM) for the acquisition of 8 temperatures using PT1000 temperature sensors (IEC60751 standard). Shielded cable is preferred for input connections.</p>
<p>A set of measurable functions makes it possible to integrate a temperature control like a thermostat in heating and cooling applications. The home automation software and GTC FreeDOM also allows module programming and supervision.</p>`,
    characteristics: `<ul><li>8 thermoresistant entries for PT1000 (IEC60751)</li><li>128 memories for internal logical operations</li><li>Range: −20°C to 150°C</li><li>Resolution: 0.1K | Precision: ±0.5K</li><li>Compensation of temperature for length of programmable cable</li><li>76 variables 16 bits for relay threshold operations</li><li>Transfer of memories towards other modules</li><li>Block with BUS terminals for the connection of additional modules</li><li>Programming by FreeDOM software</li><li>Non-volatile and reprogrammable user memory</li><li>Check status by LEDS</li><li>Rail DIN Assembly</li></ul>`,
    wiring: `<ul><li>Rigid wire min: <strong>0.14 mm²</strong></li><li>Rigid wire max: <strong>0.5 mm²</strong></li><li>Flexible wire min: <strong>0.14 mm²</strong></li><li>Flexible wire max: <strong>0.5 mm²</strong></li><li>AWG min: <strong>26</strong></li><li>AWG max: <strong>20</strong></li><li>Strip length: <strong>11mm</strong></li></ul>`,
  },

  // ─── CONTROL MODULES ─────────────────────────────────────────────────────────
  {
    key: "dtic_humo",
    name: "DTIC HUMO",
    category: "control_modules",
    categoryLabel: "Control Modules",
    info: "Acquisition CPU for T°, Humidity, IR & Controls",
    description: `<p>The CPU acquisition is an intelligent electronic card (RAM, ROM and EEPROM) for the acquisition of 9 free of potential contacts for the management of inputs, together with a temperature sensor, a humidity sensor and an IR receiver. Wall mounted module.</p>
<p>The module supports 9 inputs for cabling push-buttons, sensors in free of potential contacts (presence detector), programmed commands, or completely programmable dry contacts.</p>`,
    characteristics: `<ul><li>9 completely programmable inputs</li><li>Defining heating / air conditioning parameters</li><li>Programming by FreeDOM Software</li><li>BUS connection for data transmission</li><li>Functioning and data transmission control LED</li><li>Wall mounting</li><li>Terminal block for Temperature sensor, Humidity sensor and IR receiver</li></ul>`,
    wiring: "",
  },
  {
    key: "dtic_cpu2",
    name: "DTIC CPU2",
    category: "control_modules",
    categoryLabel: "Control Modules",
    info: "Acquisition CPU for T°, IR & Controls",
    description: `<p>The CPU acquisition is an intelligent electronic card (RAM, ROM and EEPROM) for the acquisition of 9 free of potential contacts for the management of inputs, together with a temperature sensor and an IR receiver (Type RC5-RC). Wall mounted module.</p>
<p>The module supports 9 inputs for cabling push-buttons, sensors in free of potential contacts (presence detector), programmed commands, or completely programmable dry contacts.</p>`,
    characteristics: `<ul><li>9 completely programmable inputs</li><li>Defining heating / air conditioning parameters</li><li>Programming by FreeDOM Software</li><li>BUS connection for data transmission</li><li>Functioning and data transmission control LED</li><li>Wall mounting</li><li>Terminal block for Temperature sensor and IR receiver</li></ul>`,
    wiring: "",
  },
  {
    key: "bat_sst_4000",
    name: "BAT-SST-4000",
    category: "control_modules",
    categoryLabel: "Control Modules",
    info: "Room thermostat display (Square)",
    description: `<p>BAT-SST-4000 series Modern Square Touch Screen Room Thermostats are designed for the ON/OFF control of fans and valves in air conditioning applications, comparing room temperature and setting temperature to achieve comfort and energy saving.</p>
<p>BAT-SST-4000 is a microprocessor-based thermostat with LCD display.</p>`,
    characteristics: `<ul><li>Touch buttons simplify the operation</li><li>Large screen display with backlight — easy to read even in the dark</li><li>Program schedules with four time frames maximize comfort and economy</li><li>One-touch temperature control overrides the program schedule at any time</li><li>Precise comfort control: keeps temperature within 0.5°C of the set level</li><li>Data memory when power is off</li><li>Easy installation</li><li>Modern design similar to a cell phone</li><li>Beautiful elegant chrome frame</li><li>Acrylic lenses to avoid scratching the display</li><li>Internal and external selectable sensor</li><li>86mm hidden box and European 60mm round box available</li></ul>`,
    wiring: "",
  },
  {
    key: "bat_srt_4500",
    name: "BAT-SRT-4500",
    category: "control_modules",
    categoryLabel: "Control Modules",
    info: "Room thermostat display (Round)",
    description: `<p>BAT-SRT-4500 series Modern Round Touch Screen Room Thermostats are designed for the ON/OFF control of fans and valves in air conditioning applications, comparing room temperature and setting temperature to achieve comfort and energy saving.</p>
<p>BAT-SRT-4500 is a microprocessor-based thermostat with LCD display.</p>`,
    characteristics: `<ul><li>Touch buttons simplify the operation</li><li>Large screen display with backlight — easy to read even in the dark</li><li>Program schedules with four time frames maximize comfort and economy</li><li>One-touch temperature control overrides the program schedule at any time</li><li>Precise comfort control: keeps temperature within 0.5°C of the set level</li><li>Data memory when power is off</li><li>Easy installation</li><li>Modern design similar to a cell phone</li><li>Beautiful elegant chrome frame</li><li>Acrylic lenses to avoid scratching the display</li><li>Internal and external selectable sensor</li><li>86mm hidden box and European 60mm round box available</li></ul>`,
    wiring: "",
  },
  {
    key: "mdmx_wmc00",
    name: "MDMX-WMC00",
    category: "control_modules",
    categoryLabel: "Control Modules",
    info: "Acquisition CPU with DMX",
    description: `<p>The CPU with DMX acquisition is an intelligent electronic card (RAM, ROM and EEPROM) and wired interface connectors that allows: acquisition of 8 inputs for potential free contacts (push button, presence sensor); communication between BAT modules via RS485 interface; DMX-512 communication via RS-422 interface.</p>
<p>It can be used in stand-alone mode or connected via BUS system to other BAT modules, enabling advanced functions (relay, dimmer, etc).</p>`,
    characteristics: `<ul><li>8 inputs for fully programmable dry contact points</li><li>Programming by FreeDOM Software</li><li>Status control by LEDs</li><li>BUS terminal block for connecting additional modules and the power supply</li><li>Recessed box</li></ul>`,
    wiring: "",
  },

  // ─── COMMUNICATION MODULES ───────────────────────────────────────────────────
  {
    key: "mei_9619_0_rs_232",
    name: "MEI 9619-0 RS-232",
    category: "communication_modules",
    categoryLabel: "Communication Modules",
    info: "PC Interface Module",
    description: `<p>The Computer Interface allows the communication between the BAT BUS system and the computer through the RS-232 cable and it is used for the connection with the BUS and with the automation management and monitoring system.</p>
<p>The Computer interface is also used to program the modules from the BAT network using FreeDOM Software. The Home Automation & FreeDOM Software allow the programming and supervision of the modules.</p>`,
    characteristics: `<ul><li>SUPER BUS connector for the connection with another Dispatcher module</li><li>RS-232 connector for the connection with the computer</li><li>Bus communication interface & RS232 serial port</li><li>Programming by FreeDOM software</li><li>Rail DIN Assembly</li><li>Extractable connector</li></ul>`,
    wiring: "",
  },
  {
    key: "mei_19200_rs_485",
    name: "MEI 19200 RS-485",
    category: "communication_modules",
    categoryLabel: "Communication Modules",
    info: "PC Interface Module",
    description: `<p>The MEI 19200 interface module allows sending commands to the unidirectional bus through an external interface RS485. The interface has 120 memories that will be activated/deactivated by commands sent from the external system. These memories are then transferred to any other module in the automation system.</p>
<p>The MEI 19200 is also used to program the BAT network modules using FreeDOM Software.</p>`,
    characteristics: `<ul><li>SUPER BUS connector for the connection with another Dispatcher module</li><li>RS-485 connector for the connection with the computer</li><li>Bus communication interface and RS485 serial port</li><li>Programming by FreeDOM software</li><li>Check status by LEDS</li><li>Rail DIN Assembly</li><li>Extractable connector</li></ul>`,
    wiring: "",
  },
  {
    key: "mirep_187_5",
    name: "MIREP 187.5",
    category: "communication_modules",
    categoryLabel: "Communication Modules",
    info: "CPU Repeater",
    description: `<p>The Repartitor (Dispatcher) module allows communicating between the Super BUS and the Field BUS. In the case of a BUS structure constructed behind a super BUS, the dispatcher allows the separation of the modules of a Field BUS from another BUS.</p>`,
    characteristics: `<ul><li>2 bus with galvanic insulation</li><li>Only 1 power supply needed</li><li>Message collision is not possible between bus sections</li></ul>`,
    wiring: "",
  },
  {
    key: "mrp_9619_0",
    name: "MRP 9619-0",
    category: "communication_modules",
    categoryLabel: "Communication Modules",
    info: "CPU Repeater",
    description: `<p>The repeater module is used to split a BUS when the bus cable length exceeds 100 meters or there are more than 32 modules. The lower left BUS connector feeds the electronics and leads to BUS 1. The BUS 2 connector does not require a power source.</p>`,
    characteristics: `<ul><li>Programming by FreeDOM software</li><li>SUPER BUS connector for connection with the other dispatchers</li><li>Field BUS connector for connection to the modules</li><li>Rail DIN Assembly</li><li>Extractable connector</li></ul>`,
    wiring: "",
  },
  {
    key: "mirep_9619_0_ip",
    name: "MIREP 9619-0 IP",
    category: "communication_modules",
    categoryLabel: "Communication Modules",
    info: "CPU BATnet/IP",
    description: `<p>The CPU BATnet/IP is a fully programmable hub through the FreeDOM application. The IP hub manages & supervises the installation on the IP BUS, and communication with other hubs is master-to-master through the broadband Ethernet network. Each hub also manages & supervises its Field BUS.</p>`,
    characteristics: `<ul><li>2 Ethernet ports</li><li>2 USB ports</li><li>2 serial ports (RS485 / RS232)</li><li>Internal memory</li><li>Programming by FreeDOM Software via IP communication</li><li>Time-based and astronomical time-frames</li><li>Summer / Winter changing time-frame</li><li>Data saving in non-volatile memory</li><li>Control of statuses by LEDs</li><li>DIN rail mounting box</li></ul>`,
    wiring: "",
  },
  {
    key: "bus_cable",
    name: "BAT BUS",
    category: "communication_modules",
    categoryLabel: "Communication Modules",
    info: "BUS Cable",
    description: `<p>The BAT architecture is based on several BUS levels. The IP BUS is an IP concentrator communicating with other hubs via high-speed Ethernet in "master-to-master" mode. Behind the hub, a Super BUS is made up of dispatchers communicating "master to master". Each dispatcher pilots & supervises its own Field BUS.</p>`,
    characteristics: `<ul><li>BUS cable type CAT 5</li><li>Super BUS cable type 4AF75 alarm</li><li>Field BUS cable type 4AF75 alarm</li></ul>`,
    wiring: "",
  },

  // ─── ACCESS CONTROL MODULES ──────────────────────────────────────────────────
  {
    key: "bat_lect",
    name: "BAT-LECT",
    category: "access_control_modules",
    categoryLabel: "Access Control Modules",
    info: "Card reader",
    description: `<p>BAT card reader is used for room management in hotel installations. When a MIFARE card is presented, the reader sends the card information to the wall mount CPU, which grants or denies access based on authorization.</p>
<p>A wall mount CPU can manage up to 4 readers and 16 users for all 4 readers. The wall mount CPU can also communicate with other BAT BUS systems to manage lighting, temperature settings, and blinds.</p>`,
    characteristics: `<ul><li>12VDC power supply</li><li>1 RS-485 output for wall mount CPU</li><li>1 red LED for access denied</li><li>1 green LED for access authorization</li><li>1 acoustic signal</li></ul>`,
    wiring: "",
  },
  {
    key: "maci_wmc00",
    name: "MACI-WMC00",
    category: "access_control_modules",
    categoryLabel: "Access Control Modules",
    info: "Acquisition electronic card for access control",
    description: `<p>The MACI-WMC00 CPU is a smart electronic board (RAM, ROM & EEPROM) that allows: acquisition of 9 inputs for potential free contact; communication between BAT modules via RS-485; communication with Resel Myfare 1Kb badge readers; measurement of temperature and humidity using the SHT01 probe.</p>
<p>Can be used standalone or connected via BUS, enabling: relay, dimmer, heating, cooling, dehumidification, humidification, lock opening.</p>`,
    characteristics: `<ul><li>9 inputs for fully programmable dry contact points</li><li>Programming by FreeDOM Software</li><li>Status control by LEDs</li><li>BUS terminal block for connecting additional modules and the power supply</li><li>Recessed box</li></ul>`,
    wiring: "",
  },

  // ─── VARIOUS ──────────────────────────────────────────────────────────────────
  {
    key: "dbmc001",
    name: "DBMC001",
    category: "various",
    categoryLabel: "Various",
    info: "BUS Distributor",
    description: `<p>Electronic board used to power and distribute the bus. Equipped with 4 connectors for screw terminals, 1 screw terminal block for 12VDC power supply with polarity protection, and 3 red connectors for ribbon cables. The green LED indicates that the supply voltage is above 10VDC.</p>
<p><strong>Important:</strong> Observe the maximum current of 1A per connector.</p>`,
    characteristics: `<ul><li>Block with BUS terminals for the connection of additional modules</li><li>Check status by LEDS</li><li>Rail DIN assembly</li><li>Blocks with borders to be connected</li><li>Max 1A per connector</li></ul>`,
    wiring: "",
  },
  {
    key: "lsfol",
    name: "LSFOL",
    category: "various",
    categoryLabel: "Various",
    info: "IR Receiver",
    description: `<p>The IR LSFOL receiver allows receiving commands from the DMTC008 remote control. It must be connected on a DTIC CPU to be powered.</p>`,
    characteristics: "",
    wiring: "",
  },
  {
    key: "dmtc008",
    name: "DMTC008",
    category: "various",
    categoryLabel: "Various",
    info: "IR Remote control 7 to 28 channels",
    description: `<p>The IR remote control allows sending 7 IR commands + 1 command for bank shifting (4 banks available) to an IR receiver connected on a DTIC CPU. This gives a total of up to 28 channels (7 commands × 4 banks).</p>`,
    characteristics: "",
    wiring: "",
  },
  {
    key: "bat_gen_led_rgb",
    name: "BAT Gen LED RGB",
    category: "various",
    categoryLabel: "Various",
    info: "RGB LED Generator",
    description: `<p>The LED-DMX light source series adopts advanced microelectronics control technology, converting the DMX512/1990 international standard digital control signal into an analogue control signal. Three channels (RGB) with up to 256 stages per channel to control the light level.</p>`,
    characteristics: "",
    wiring: "",
  },
  {
    key: "bat_leg",
    name: "BAT LEG",
    category: "various",
    categoryLabel: "Various",
    info: "LEG Light Engine Generator",
    description: `<p>The BAT LEG is a professional light engine generator series. Ensure the Light Engine Generator and Power Source have the same voltage. Keep out of rain or moist areas to avoid shock hazards. Avoid use at high ambient temperature (>40°C).</p>`,
    characteristics: `<ul><li>Voltage: 220V</li><li>LED: White</li><li>Color Wheel: 6 colors</li><li>Life of LED: 50,000 hours</li><li>Size: 270 × 264 × 135mm</li><li>Gross Weight: 6.0 Kg</li><li>Standard Aperture: Φ28mm / Φ24mm / Φ20mm (Optional: Φ30mm Max)</li></ul>`,
    wiring: "",
  },
  {
    key: "bat_leg_0_10v",
    name: "BAT LEG 0-10v",
    category: "various",
    categoryLabel: "Various",
    info: "LEG Light Engine Generator 0-10v",
    description: `<p>The BAT LEG 0-10v is a professional light engine generator with 0-10v variation signal. Ensure the Light Engine Generator and Power Source have the same voltage. Keep out of rain or moist areas. Avoid use at high ambient temperature (>40°C).</p>`,
    characteristics: `<ul><li>Voltage: 220V</li><li>LED: White</li><li>Variation: 0-10v signal</li><li>Life of LED: 50,000 hours</li><li>Size: 270 × 264 × 135mm</li><li>Gross Weight: 6.0 Kg</li><li>Standard Aperture: Φ28mm / Φ24mm / Φ20mm (Optional: Φ30mm Max)</li></ul>`,
    wiring: "",
  },

  // ─── KIT SMART DIMMER LED ─────────────────────────────────────────────────────
  {
    key: "mdl_24_4101_smart_dimmer",
    name: "MDL 24-4101 Smart Dimmer",
    category: "kit_smart_dimmer_led",
    categoryLabel: "KIT Smart Dimmer LED",
    info: "Smart Dimmer LED 12-24",
    description: `<p>The CPU with variable intensity is an intelligent electronic card (RAM, ROM and EEPROM) for the acquisition of 8 free of potential contacts and for managing 4 dimming outputs. The first four inputs are for independent control of the 4 outputs via pushbuttons; the last four entries are for scenario activation.</p>
<p>The CPU operates independently of other modules. It has a default programming — once installed, it does not require any additional programming.</p>`,
    characteristics: `<ul><li>8 dry contact inputs</li><li>4 programmable scenarios</li><li>4 dimmer outputs</li><li>Output status memory in case of power failure</li><li>Electronic protection against short-circuit and overload</li><li>Automatic power management for overheating</li><li>Removable connectors</li><li>Entirely tropicalized electronics</li><li>Rail DIN Assembly</li></ul>`,
    wiring: "",
  },
];
