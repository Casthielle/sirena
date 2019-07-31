import React from 'react';
import './spinners.css';
import {PropagateLoader, PulseLoader, MoonLoader, BeatLoader, BarLoader, SyncLoader} from 'react-spinners';

const Propagate = (props) => (
  <div className='spinner-wrapper'><PropagateLoader {...props} /></div>
);

const Pulse = (props) => (
  <div className='spinner-wrapper'><PulseLoader {...props} /></div>
);

const Moon = (props) => (
  <div className='spinner-wrapper'><MoonLoader {...props} /></div>
);

const Beat = (props) => (
  <div className='spinner-wrapper'><BeatLoader {...props} /></div>
);

const Bar = (props) => (
  <div className='spinner-wrapper'><BarLoader {...props} /></div>
);

const Sync = (props) => (
  <div className='spinner-wrapper'><SyncLoader {...props} /></div>
);

export {Propagate, Pulse, Moon, Beat, Bar, Sync};
