// This likely wiil take place of keiserBLE from keiser2Zwift repo
import {CyclingPowerService} from './services/cycling-power'
import {CyclingSpeedAndCadenceService} from './services/cycling-speed-and-cadence'
import {FitnessMachineService} from './services/fitness-machine'
import {BleServer} from '../../util/ble-server'

export const DEFAULT_NAME = 'M3iPiZeroW';

/**
 * Handles communication with apps (e.g. Zwift) using the standard Bluetooth Services
 * LE GATT Cycling Power, Cycling Speed and Cadence, & Fitness Maschine
 */
export class M3iPiZeroW extends BleServer {
  /**
   * Create a M3iPiZeroWServer instance.
   * @param {Bleno} bleno - a Bleno instance.
   */
  constructor(bleno, name=DEFAULT_NAME) {
    super(bleno, name, [
      new CyclingPowerService(),
      new CyclingSpeedAndCadenceService(),
      new FtinessMachineService()
    ])
  }

  /**
   * Notify subscriber (e.g. Zwift) of new Cycling Power Measurement.
   * @param {object} measurement - new cycling power measurement.
   * @param {number} measurement.power - current power (watts)
	 * @param {object} [measurement.crank] - last crank event.
   * @param {number} measurement.crank.revolutions - revolution count at last crank event.
   * @param {number} measurement.crank.timestamp - timestamp at last crank event.
   */
  updateMeasurement(measurement) {
    for (let s of this.services) {
      s.updateMeasurement(measurement)
    }
  }
}
