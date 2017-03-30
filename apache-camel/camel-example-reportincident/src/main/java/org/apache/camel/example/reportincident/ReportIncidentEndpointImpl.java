package org.apache.camel.example.reportincident;

import java.io.File;

import org.apache.camel.CamelContext;
import org.apache.camel.Component;
import org.apache.camel.Endpoint;
import org.apache.camel.Exchange;
import org.apache.camel.Producer;
import org.apache.camel.ProducerTemplate;
import org.apache.camel.component.file.FileComponent;
import org.apache.camel.component.file.FileEndpoint;
import org.apache.camel.component.log.LogComponent;
import org.apache.camel.impl.DefaultCamelContext;

/**
 * The webservice we have implemented.
 */
public class ReportIncidentEndpointImpl implements ReportIncidentEndpoint{
	
	private CamelContext camel;
	private ProducerTemplate template;
	
	public ReportIncidentEndpointImpl() throws Exception {
	    // create the camel context that is the "heart" of Camel
	    camel = new DefaultCamelContext();
	    
	    // get the ProducerTemplate thst is a Spring'ish xxxTemplate based producer for very
	    // easy sending exchanges to Camel.
	    template = camel.createProducerTemplate();

	 
	    // start Camel
	    camel.start();
	}

	public OutputReportIncident reportIncident(InputReportIncident parameters) {
		String name = parameters.getGivenName() + " " + parameters.getFamilyName();
	    
	    template.sendBody("log:com.mycompany.part2.easy", name);
	    String filename = "easy-incident-" + parameters.getIncidentId() + ".txt";
	    template.sendBodyAndHeader("file://target/subfolder", name, FileComponent.HEADER_FILE_NAME, filename);
		
        OutputReportIncident out = new OutputReportIncident();
        out.setCode("OK");
        return out;
	}
	
}
