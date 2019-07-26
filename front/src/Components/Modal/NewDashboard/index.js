import React from 'react';
import { IoMdLink, IoMdDocument, IoMdResize, IoMdTime, IoMdHourglass, IoMdCalendar } from 'react-icons/io';

const NewDashboard = () => {
    return (
        <form>
            <div className="container modal-form">
                <div className="row">
                    <div className="input-group col-sm-12">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Template</span>
                        </div>
                        <select className="custom-select">
                            <option defaultValue>None</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="input-group col-sm-12">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><IoMdLink /></span>
                        </div>
                        <input type="text" className="form-control" placeholder="Url" />
                    </div>
                </div>
                <div className="row">
                    <div className="input-group col-sm-6">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><IoMdLink /></span>
                        </div>
                        <input type="text" className="form-control" placeholder="Watermark" />
                    </div>
                    <div className="input-group col-sm-6">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><IoMdLink /></span>
                        </div>
                        <select className="custom-select">
                            <option defaultValue>Centered</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="input-group col-sm-12">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><IoMdDocument /></span>
                        </div>
                        <input type="text" className="form-control" placeholder="Description" />
                    </div>
                </div>
                <div className="row">
                    <div className="input-group col-sm-12">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><IoMdResize /></span>
                        </div>
                        <input type="text" className="form-control" placeholder="Viewport size (width x height)" />
                    </div>
                </div>
                <div className="row">
                    <div className="input-group col-sm-6">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><IoMdHourglass /></span>
                        </div>
                        <input type="text" className="form-control" placeholder="Timeout" />
                        <div className="input-group-append">
                            <select className="custom-select">
                                <option defaultValue>sec</option>
                            </select>
                        </div>
                    </div>
                    <div className="input-group col-sm-6">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><IoMdTime /></span>
                        </div>
                        <input type="text" className="form-control" placeholder="Delay" />
                    </div>
                </div>
                <div className="row">
                    <div className="input-group col-sm-12">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><IoMdCalendar /></span>
                        </div>
                        <textarea className="form-control" placeholder="This dashboard is available when..." />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default NewDashboard;