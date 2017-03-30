package org.apache.camel.example.reportincident;

import org.apache.camel.CamelContext;
import org.apache.camel.ProducerTemplate;
import org.apache.camel.component.file.FileComponent;
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
	    
	    String filename = "mail-incident-" + parameters.getIncidentId() + ".txt";
	    
	    // generate the mail body using velocity template
	    // notice that we just pass in our POJO (= InputReportIncident) that we
	    // got from Apache CXF to Velocity.
	    Object mailBody = template.sendBody("velocity:mailBody.vm", parameters);
	    // Note: the response is a String and can be cast to String if needed
	    
	    template.sendBodyAndHeader("file://target/subfolder", mailBody, FileComponent.HEADER_FILE_NAME, filename);
		
        OutputReportIncident out = new OutputReportIncident();
        out.setCode("OK");
        return out;
	}
	
}
