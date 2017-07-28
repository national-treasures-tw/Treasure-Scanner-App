## Installation

```sh
yarn install
```

## Run

* open `ios/TaiwanNationalTreasure.xcodeproj` in XCode
* Select your device
* Run the project (Cmd + R)

## Unit tests

For now only the redux reducers and selectors (reselect) are tested

```sh
yarn test
```

# Known issues

#### Rotation limitation

Rotation is done from the cropped document, not the original document. This is done because otherwise we have to also calculate and rotate the polygons. Because the rotation is done on the cropped document and we re-save it as jpeg with 0.9 as quality we lose some quality each time we rotate. This is not a big problem and not noticeable if you rotate 4 times. But you will notice it if you rotate 50 times.

#### HUD

While scanning we use `viewForDetectionStatus` of the ScanbotSDK to display the current status of the scanner. For example: "Searching for document..." or "Move closer.". However, sometimes the SDK does not call that method, for example when the scan mode is manual. Therefore if you scan in manual mode you won't see the "Saving document..." label.